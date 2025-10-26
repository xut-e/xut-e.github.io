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
    # 1. quitar extensión .md si la hay
    if name.lower().endswith(".md"):
        name = name[:-3]

    # 2. normalizar acentos
    nfkd = unicodedata.normalize("NFKD", name)
    no_accents = "".join([c for c in nfkd if not unicodedata.combining(c)])

    # 3. reemplazar caracteres raros por espacio
    cleaned = re.sub(r"[^0-9a-zA-Z._ -]+", " ", no_accents)

    # 4. trim
    cleaned = cleaned.strip()

    # 5. puntos tipo "1. " -> "1-"
    cleaned = re.sub(r"(^|\s)(\d+)\.\s+", r"\1\2-", cleaned)

    # 6. espacios y puntos -> guiones
    cleaned = cleaned.replace(".", "-")
    cleaned = re.sub(r"\s+", "-", cleaned)

    # 7. bajar a minúsculas
    cleaned = cleaned.lower()

    # 8. doble guion colapsado
    cleaned = re.sub(r"-+", "-", cleaned).strip("-")

    return cleaned

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
# Paso 1: indexar todas las notas y decidir URLs
# -----------------

notes = []  # cada item: { "title": "0. Offensive...", "src": Path(...), "url": "/apuntes/thm/1-pre-security/.../" }

def platform_slug(parts_after_ciberseguridad):
    # parts_after_ciberseguridad[0] será "THM", "HTB", etc.
    return slugify(parts_after_ciberseguridad[0])

def build_url_for_file(md_path: Path):
    # md_path relativo a CONTENT_ROOT
    rel = md_path.relative_to(CONTENT_ROOT)  # e.g. THM/1. Pre Security/1. Introduction.../0. Offensive Security Intro.md
    parts = rel.parts

    # plataforma (THM / HTB / ...)
    plat = platform_slug(parts)

    # sluggear cada carpeta y el propio archivo
    slugs = [slugify(p) for p in parts]

    # última parte es la nota .md -> será carpeta final
    slugs[-1] = slugify(parts[-1])

    # URL final tipo /apuntes/thm/.../ (sin .html; usaremos index.html)
    return "/apuntes/" + "/".join([plat] + slugs[1:]) + "/"

def walk_md_files():
    for p in CONTENT_ROOT.rglob("*.md"):
        # ignoramos cosas tipo README si algún día hay, pero de momento pillamos todo
        title = p.stem
        url = build_url_for_file(p)
        notes.append({
            "title": title,
            "src": p,
            "url": url,
        })

walk_md_files()

# Creamos lookup para [[link interno]]
title_to_url = {}
for n in notes:
    # clave exacta = nombre del archivo sin .md (tal cual)
    title_to_url[n["title"]] = n["url"]

# -----------------
# Paso 2: procesar cada nota .md -> contenido listo para Jekyll
# -----------------

def fix_internal_links(md_text: str) -> str:
    # [[Nombre de la nota]] -> [Nombre de la nota](URL)
    def repl(m):
        inner = m.group(1).strip()
        url = title_to_url.get(inner)
        if not url:
            # si no la encontramos, dejamos el texto plano entre ** para que se note roto
            return f"**{inner}**"
        return f"[{inner}]({url})"
    md_text = re.sub(r"\[\[([^\]]+)\]\]", repl, md_text)
    return md_text

def fix_images(md_text: str) -> str:
    # ![[nombre.png]] -> ![]( /apuntes/img/nombre.png )
    def repl(m):
        img_name = m.group(1).strip()
        return f"![](/apuntes/img/{img_name})"
    md_text = re.sub(r"!\[\[([^\]]+)\]\]", repl, md_text)
    return md_text

def convert_one_note(note):
    raw = read_file(note["src"])
    body = raw

    # reparar imagenes primero (para que no se conviertan como links internos normales)
    body = fix_images(body)
    body = fix_internal_links(body)

    # front matter Jekyll
    front = "---\nlayout: apunte\ntitle: \"" + note["title"].replace('"','\\"') + "\"\n---\n\n"
    final_md = front + body

    # decidir salida física
    # url /apuntes/thm/.../  ->  carpeta apuntes/thm/.../index.md
    out_rel = note["url"].replace("/apuntes/","")  # thm/1-pre-security/...
    out_rel = out_rel.strip("/")
    out_dir = OUTPUT_ROOT / out_rel
    out_file = out_dir / "index.md"

    write_file(out_file, final_md)

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
# Paso 4: generar sidebar.html
# Queremos árbol:
#   Plataforma (THM / HTB / ...)
#     Curso (1. Pre Security ...)
#       Unidad / Tema ...
#
# Vamos a basarnos en las rutas reales en disco.

tree = {}  # { "THM": { "1. Pre Security": {...}, "2. Cyber Security 101": {...} }, "HTB": {...} }

for n in notes:
    rel = n["src"].relative_to(CONTENT_ROOT)
    parts = rel.parts  # [THM, '1. Pre Security', '1. Introduction...', '0. Offensive Security Intro.md']
    if len(parts) == 0: 
        continue
    plat = parts[0]
    tree.setdefault(plat, {})

    # metemos todo el path menos el último archivo md como jerarquía de carpetas
    # y guardamos las notas debajo
    cursor = tree[plat]
    for i, part in enumerate(parts[1:-1]):  # exclude plat and final file
        cursor = cursor.setdefault(part, {})

    # último nivel: la propia nota
    leaf_title = n["title"]
    cursor.setdefault("_notes", [])
    cursor["_notes"].append({
        "title": leaf_title,
        "url": n["url"]
    })

def render_node(node, depth=0):
    html = []
    # subcarpetas (orden alfabético natural)
    for name, child in sorted(node.items()):
        if name == "_notes":
            continue
        # carpeta
        html.append(f"<details{' open' if depth==0 else ''}><summary>{name}</summary>")
        html.append(render_node(child, depth+1))
        html.append("</details>")
    # notas en este nivel
    for note in sorted(node.get("_notes", []), key=lambda x: x["title"]):
        html.append(f'<a class="sidebar-link" href="{note["url"]}">{note["title"]}</a>')
    return "\n".join(html)

sidebar_html = "<nav class=\"sidebar-tree\">\n"
for plat_name, plat_node in sorted(tree.items()):
    sidebar_html += f"<details open><summary>{plat_name}</summary>\n"
    sidebar_html += render_node(plat_node, depth=1)
    sidebar_html += "\n</details>\n"
sidebar_html += "</nav>\n"

write_file(INCLUDES_ROOT / "sidebar.html", sidebar_html)

# -----------------
# Paso 5: generar index.json para el home
# Por ahora, lista plana con todas las notas.
index_json = []
for n in notes:
    index_json.append({
        "title": n["title"],
        "path": n["url"]
    })

write_file(OUTPUT_ROOT / "index.json", json.dumps(index_json, ensure_ascii=False, indent=2))

print("OK: apuntes generados.")

