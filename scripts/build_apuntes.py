import os, re, json, shutil, unicodedata, hashlib
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent  # repo root

# Detectar carpeta 'Ciberseguridad' o 'ciberseguridad'
CONTENT_ROOT = None
for name in ("Ciberseguridad", "ciberseguridad"):
    candidate = Path(ROOT / "content" / name)
    if candidate.exists():
        CONTENT_ROOT = candidate
        break

if CONTENT_ROOT is None:
    raise FileNotFoundError("❌ No se encontró la carpeta 'content/Ciberseguridad' ni 'content/ciberseguridad'")

OUTPUT_ROOT = ROOT / "apuntes"
INCLUDES_ROOT = ROOT / "_includes"
IMG_OUTPUT_DIR = OUTPUT_ROOT / "img"
MTIMES_FILE = OUTPUT_ROOT / "mtimes.json"

# ================================================
#  MTIMES PERSISTENTES (LA CLAVE DE TODO ESTO)
# ================================================

def load_mtimes():
    if MTIMES_FILE.exists():
        try:
            return json.load(open(MTIMES_FILE, "r", encoding="utf-8"))
        except:
            pass
    return {}

def save_mtimes(db):
    with open(MTIMES_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)

def file_hash(path: Path):
    """Hash para detectar cambios reales en contenido."""
    h = hashlib.sha256()
    with path.open("rb") as f:
        while True:
            chunk = f.read(8192)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()

def get_real_modified(path: Path, mtime_db):
    """Devuelve la fecha real persistente, actualizándola solo si el contenido cambió de verdad."""
    rel = str(path.relative_to(CONTENT_ROOT))
    current_hash = file_hash(path)

    entry = mtime_db.get(rel)

    if entry:
        old_hash = entry["hash"]
        old_time = entry["modified"]

        # Si el hash NO ha cambiado, devolvemos la fecha que teníamos
        if old_hash == current_hash:
            return old_time
        else:
            # Hash diferente → actualización real hecha por el usuario
            new_time = datetime.now().isoformat(timespec="seconds")
            mtime_db[rel] = {"modified": new_time, "hash": current_hash}
            return new_time
    else:
        # Primera vez que lo vemos → guardar fecha actual real
        new_time = datetime.now().isoformat(timespec="seconds")
        mtime_db[rel] = {"modified": new_time, "hash": current_hash}
        return new_time

# ================================================
#  Helpers
# ================================================

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
    return p.read_text(encoding="utf-8")

def write_file(p: Path, data: str):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(data, encoding="utf-8")

def copy_image(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

# ================================================
# Paso 1 — indexar notas originales
# ================================================

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

# ================================================
# Paso 2 — Procesar notas (NO tocamos originales)
# ================================================

def fix_internal_links(md_text: str) -> str:
    def repl(m):
        inner = m.group(1).strip()
        url = title_to_url.get(inner)
        return f"[{inner}]({url})" if url else f"**{inner}**"
    return re.sub(r"\[\[([^\]]+)\]\]", repl, md_text)

def fix_images(md_text: str) -> str:
    return re.sub(
        r"!\[\[([^\]]+)\]\]",
        lambda m: f"![](/apuntes/img/{m.group(1).strip()})",
        md_text,
    )

def convert_one_note(note):
    raw = read_file(note["src"])
    body = fix_images(fix_internal_links(raw))
    front = f"---\nlayout: apunte\ntitle: \"{note['title'].replace('\"','\\\"')}\"\n---\n\n"
    out_rel = note["url"].replace("/apuntes/", "").strip("/")
    out_dir = OUTPUT_ROOT / out_rel
    write_file(out_dir / "index.md", front + body)

for n in notes:
    convert_one_note(n)

# ================================================
# Paso 3 — copiar imágenes
# ================================================

def copy_all_images():
    src_img_dir = CONTENT_ROOT / "Z Imagenes"
    if src_img_dir.exists():
        for img in src_img_dir.iterdir():
            if img.is_file():
                copy_image(img, IMG_OUTPUT_DIR / img.name)

copy_all_images()

# ================================================
# Paso 4 — generar sidebar
# ================================================

tree = {}

for n in notes:
    rel = n["src"].relative_to(CONTENT_ROOT)
    parts = rel.parts
    if not parts:
        continue
    plat = parts[0]
    tree.setdefault(plat, {})
    cursor = tree[plat]

    for part in parts[1:-1]:
        cursor = cursor.setdefault(part, {})
    cursor.setdefault("_notes", []).append({"title": n["title"], "url": n["url"]})

def render_node(node, depth=0):
    html = []
    for name, child in sorted(node.items()):
        if name == "_notes":
            continue

        html.append(f"<details{' open' if depth==0 else ''}><summary>{name}</summary>")
        html.append(render_node(child, depth + 1))
        html.append("</details>")

    for note in sorted(node.get("_notes", []), key=lambda x: x["title"]):
        html.append(f'<a class="sidebar-link" href="{note["url"]}">{note["title"]}</a>')

    return "\n".join(html)

sidebar_html = "<nav class=\"sidebar-tree\">\n"
for plat_name, plat_node in sorted(tree.items()):
    sidebar_html += f"<details open><summary>{plat_name}</summary>\n{render_node(plat_node, 1)}\n</details>\n"
sidebar_html += "</nav>\n"

write_file(INCLUDES_ROOT / "sidebar.html", sidebar_html)

# ================================================
# Paso 5 — index.json plano
# ================================================

write_file(
    OUTPUT_ROOT / "index.json",
    json.dumps([{ "title": n["title"], "path": n["url"] } for n in notes],
               ensure_ascii=False, indent=2)
)

# ================================================
# Paso 6 — arbol.json
# ================================================

def build_tree(path: Path, parent_is_leaf=False):
    if path.name in ("Z Imagenes", ".obsidian") or path.name.startswith("."):
        return None
    node = {"name": path.name}

    if path.is_dir():
        node["type"] = "directory"
        contents = []
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

        if parent_is_leaf and name.startswith("0."):
            return None

        clean_file = re.sub(r"^\d+\.\s*", "", name).lower()
        clean_parent = re.sub(r"^\d+\.\s*", "", parent).lower()
        if clean_file == clean_parent:
            if len(list(path.parent.glob("*.md"))) == 1:
                return None

        rel = path.relative_to(CONTENT_ROOT)
        node["type"] = "file"
        node["path"] = f"content/Ciberseguridad/{rel.as_posix()}"

    else:
        return None

    return node

arbol = build_tree(CONTENT_ROOT)
write_file(OUTPUT_ROOT / "arbol.json", json.dumps(arbol, ensure_ascii=False, indent=2))

# ================================================
# Paso 7 — index_full.json (fecha real persistente)
# ================================================

def build_full_index():
    mtime_db = load_mtimes()
    notes_full = []

    for file_path in CONTENT_ROOT.rglob("*.md"):
        try:
            text = file_path.read_text(encoding="utf-8")
        except:
            continue

        rel = file_path.relative_to(CONTENT_ROOT)
        breadcrumb = " > ".join(rel.parts[:-1])
        url = build_url_for_file(file_path)
        content_src = f"content/Ciberseguridad/{rel.as_posix()}"

        modified = get_real_modified(file_path, mtime_db)

        notes_full.append({
            "title": file_path.stem,
            "path": url,
            "src": content_src,
            "breadcrumb": breadcrumb,
            "content": text.strip(),
            "modified": modified
        })

    # guardar mtimes persistentes
    save_mtimes(mtime_db)

    write_file(
        OUTPUT_ROOT / "index_full.json",
        json.dumps(notes_full, ensure_ascii=False, indent=2)
    )
    print("[+] index_full.json generado.")

build_full_index()

# ================================================
# Paso 8 — latest_notes.json (top 5 reales)
# ================================================

def build_latest_notes():
    index_full = json.load(open(OUTPUT_ROOT / "index_full.json", encoding="utf-8"))

    # ordenar por fecha persistente
    sorted_notes = sorted(
        index_full,
        key=lambda x: x["modified"],
        reverse=True
    )

    top5 = sorted_notes[:5]

    write_file(
        OUTPUT_ROOT / "latest_notes.json",
        json.dumps(top5, ensure_ascii=False, indent=2)
    )
    print("[+] latest_notes.json generado.")

build_latest_notes()

print("✅ Apuntes generados correctamente con fechas reales persistentes.")

