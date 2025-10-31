import os, re, json, shutil, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # repo root
CONTENT_ROOT = ROOT / "content" / "Ciberseguridad"
OUTPUT_ROOT = ROOT / "apuntes"
INCLUDES_ROOT = ROOT / "_includes"
IMG_OUTPUT_DIR = OUTPUT_ROOT / "img"

# -----------------
# helpers
# -----------------

def slugify(name: str) -> str:
    if name.lower().endswith(".md"):
        name = name[:-3]
    nfkd = unicodedata.normalize("NFKD", name)
    no_accents = "".join([c for c in nfkd if not unicodedata.combining(c)])
    cleaned = re.sub(r"[^0-9a-zA-Z._ -]+", " ", no_accents).strip()
    cleaned = re.sub(r"(^|\s)(\d+)\.\s+", r"\1\2-", cleaned)
    cleaned = cleaned.replace(".", "-")
    cleaned = re.sub(r"\s+", "-", cleaned).lower()
    return re.sub(r"-+", "-", cleaned).strip("-")

def read_file(p: Path) -> str:
    with p.open("r", encoding="utf-8") as f:
        return f.read()

def write_file(p: Path, data: str):
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("w", encoding="utf-8") as f:
        f.write(data)

def copy_image(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

# -----------------
# Paso 1: indexar todas las notas
# -----------------

notes = []

def platform_slug(parts_after_ciberseguridad):
    return slugify(parts_after_ciberseguridad[0])

def build_url_for_file(md_path: Path):
    rel = md_path.relative_to(CONTENT_ROOT)
    parts = rel.parts
    plat = platform_slug(parts)
    slugs = [slugify(p) for p in parts]
    slugs[-1] = slugify(parts[-1])
    return "/apuntes/" + "/".join([plat] + slugs[1:]) + "/"

def walk_md_files():
    for p in CONTENT_ROOT.rglob("*.md"):
        title = p.stem
        url = build_url_for_file(p)
        notes.append({"title": title, "src": p, "url": url})

walk_md_files()

title_to_url = {n["title"]: n["url"] for n in notes}

# -----------------
# Paso 2: procesar notas
# -----------------

def fix_internal_links(md_text: str) -> str:
    def repl(m):
        inner = m.group(1).strip()
        url = title_to_url.get(inner)
        return f"[{inner}]({url})" if url else f"**{inner}**"
    return re.sub(r"\[\[([^\]]+)\]\]", repl, md_text)

def fix_images(md_text: str) -> str:
    return re.sub(r"!\[\[([^\]]+)\]\]", lambda m: f"![](/apuntes/img/{m.group(1).strip()})", md_text)

def convert_one_note(note):
    raw = read_file(note["src"])
    body = fix_images(fix_internal_links(raw))
    front = f"---\nlayout: apunte\ntitle: \"{note['title'].replace('\"','\\\"')}\"\n---\n\n"
    out_rel = note["url"].replace("/apuntes/","").strip("/")
    out_dir = OUTPUT_ROOT / out_rel
    write_file(out_dir / "index.md", front + body)

for n in notes:
    convert_one_note(n)

# -----------------
# Paso 3: copiar imágenes
# -----------------

def copy_all_images():
    src_img_dir = CONTENT_ROOT / "Z Imagenes"
    if src_img_dir.exists():
        for img in src_img_dir.iterdir():
            if img.is_file():
                copy_image(img, IMG_OUTPUT_DIR / img.name)
copy_all_images()

# -----------------
# Paso 4: sidebar.html (sin cambios)
# -----------------
tree = {}
for n in notes:
    rel = n["src"].relative_to(CONTENT_ROOT)
    parts = rel.parts
    if len(parts) == 0:
        continue
    plat = parts[0]
    tree.setdefault(plat, {})
    cursor = tree[plat]
    for i, part in enumerate(parts[1:-1]):
        cursor = cursor.setdefault(part, {})
    cursor.setdefault("_notes", []).append({"title": n["title"], "url": n["url"]})

def render_node(node, depth=0):
    html = []
    for name, child in sorted(node.items()):
        if name == "_notes":
            continue
        html.append(f"<details{' open' if depth==0 else ''}><summary>{name}</summary>")
        html.append(render_node(child, depth+1))
        html.append("</details>")
    for note in sorted(node.get("_notes", []), key=lambda x: x["title"]):
        html.append(f'<a class="sidebar-link" href="{note["url"]}">{note["title"]}</a>')
    return "\n".join(html)

sidebar_html = "<nav class=\"sidebar-tree\">\n"
for plat_name, plat_node in sorted(tree.items()):
    sidebar_html += f"<details open><summary>{plat_name}</summary>\n{render_node(plat_node,1)}\n</details>\n"
sidebar_html += "</nav>\n"
write_file(INCLUDES_ROOT / "sidebar.html", sidebar_html)

# -----------------
# Paso 5: index.json plano
# -----------------
index_json = [{"title": n["title"], "path": n["url"]} for n in notes]
write_file(OUTPUT_ROOT / "index.json", json.dumps(index_json, ensure_ascii=False, indent=2))

# -----------------
# Paso 6: arbol.json jerárquico (mantiene números + ignora .obsidian)
# -----------------
def build_tree(path: Path, parent_is_leaf=False):
    # Ignorar carpetas ocultas y Z Imagenes
    if path.name in ("Z Imagenes", ".obsidian") or path.name.startswith("."):
        print(f"⛔ Ignorada carpeta: {path.name}")
        return None

    node = {"name": path.name}

    if path.is_dir():
        node["type"] = "directory"
        contents = []

        # Detectar si el directorio es de último nivel (no tiene subcarpetas)
        has_subdirs = any(c.is_dir() for c in path.iterdir())
        is_leaf_dir = not has_subdirs

        for child in sorted(path.iterdir()):
            child_node = build_tree(child, parent_is_leaf=is_leaf_dir)
            if child_node:
                if child.is_file():
                    child_node["parent"] = path.name
                contents.append(child_node)

        node["contents"] = contents

    elif path.is_file() and path.suffix.lower() == ".md":
        name = path.stem
        parent = path.parent.name

        # === Reglas de exclusión ===
        # Ignorar archivos 0.*.md en último nivel
        if parent_is_leaf and name.startswith("0."):
            print(f"⛔ Ignorado índice local (último nivel): {path}")
            return None

        # Ignorar índices de carpeta solo si son el único .md dentro
        clean_file = re.sub(r"^\d+\.\s*", "", name).strip().lower()
        clean_parent = re.sub(r"^\d+\.\s*", "", parent).strip().lower()
        same_name = clean_file == clean_parent

        if same_name:
            md_count = len([f for f in path.parent.glob("*.md")])
            if md_count == 1:
                print(f"⛔ Ignorado índice de carpeta (único .md): {path}")
                return None
            else:
                print(f"✅ No ignorado (mismo nombre pero hay más archivos): {path}")

        node["type"] = "file"
        rel_path = path.relative_to(CONTENT_ROOT)
        node["path"] = f"content/Ciberseguridad/{rel_path.as_posix()}"

    else:
        return None

    return node


arbol = build_tree(CONTENT_ROOT)
write_file(OUTPUT_ROOT / "arbol.json", json.dumps(arbol, ensure_ascii=False, indent=2))

print("✅ Apuntes generados correctamente con index.json, sidebar.html y arbol.json (mantiene números, ignora .obsidian)")

