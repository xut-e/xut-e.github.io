/* ============================================================
   🔥 OBSIDIAN-LIKE PREPROCESSOR
   Reconstruye listas, sublistas, imágenes y párrafos exactamente
   como Obsidian, ANTES de markdown-it.
   ============================================================ */

const ObsidianPreprocessor = {

  process(md) {

    // Normalizar saltos y tabs → tabs = 4 espacios
    md = md.replace(/\r\n/g, "\n")
           .replace(/\t/g, "    ");

    /* ============================================================
       🔥 1) PROTEGER BLOQUES DE CÓDIGO TRIPLE ```lang\n...```
       ============================================================ */

    const BLOCKS = [];

    md = md.replace(/```([\w-]*)\n([\s\S]*?)```/g, (m, lang, code) => {
      const placeholder = `@@BLOCK${BLOCKS.length}@@`;
      BLOCKS.push({ lang: lang || "", code });
      return placeholder;
    });

    /* ============================================================
       🔥 2) PROTEGER INLINE CODE `...`
       ============================================================ */

    const INLINE_CODE = [];

    md = md.replace(/`([^`]+)`/g, (m, code) => {
      const placeholder = `@@INLINE${INLINE_CODE.length}@@`;
      INLINE_CODE.push(code);
      return placeholder;
    });

    // === CONVERTIR ENLACES MARKDOWN [texto](url) ===
md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
  // Proteger el enlace dentro de inline code, si procede
  return `<a href="${url.trim()}" target="_blank" rel="noopener">${text.trim()}</a>`;
});


    /* ============================================================
       🖼 3) Sustituir imágenes Obsidian ![[file.png]]
       ============================================================ */

    md = md.replace(/!\[\[(.+?)\]\]/g, (m, file) =>
      `<img class="md-img" src="/content/Ciberseguridad/Ciberseguridad/Z%20Imagenes/${encodeURIComponent(file.trim())}" alt="${file.trim()}">`
    );

    /* ============================================================
       ─── HR: líneas horizontales ───
       ============================================================ */

    md = md.replace(/^[-]{3,}$/gm, "<hr>");

    /* ============================================================
       🔧 4) PREPROCESADO MANUAL DE LISTAS (estilo Obsidian)
       ============================================================ */

    const lines = md.split("\n");
    let html = [];
    let stack = []; // niveles abiertos: "olist" or "ulist"

    function open(type, level) {
      if (type === "olist") {
        html.push(`<div class="olist-level olist-level-${level}">`);
        stack.push("olist");
      } else {
        html.push(`<ul class="ulist-level ulist-level-${level}">`);
        stack.push("ulist");
      }
    }

    function close(level) {
      while (stack.length > level) {
        const closing = stack.pop();
        html.push(closing === "olist" ? "</div>" : "</ul>");
      }
    }

    for (let raw of lines) {

      // Número de espacios REALES
      const matchSpaces = raw.match(/^( +)/);
      const spaces = matchSpaces ? matchSpaces[0].length : 0;

      // Obsidian: 4 espacios = 1 nivel
      const level = Math.floor(spaces / 4);

      const trimmed = raw.trim();

      /* ===== Ordered list ===== */
      const ol = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (ol) {
        close(level);
        if (stack.length === level) open("olist", level);
        html.push(`<div class="olist-item" data-number="${ol[1]}">${ol[2]}</div>`);
        continue;
      }

      /* ===== Unordered list ===== */
      const ul = trimmed.match(/^[-+*]\s+(.*)$/);
      if (ul) {
        close(level);
        if (stack.length === level) open("ulist", level);
        html.push(`<div class="ulist-item">${ul[1]}</div>`);
        continue;
      }

      /* ===== Texto dentro de una lista ===== */
      if (stack.length > 0 && trimmed.length > 0) {
        html.push(`<p>${trimmed}</p>`);
        continue;
      }

      /* ===== Línea normal ===== */
      close(0);
      html.push(trimmed);
    }

    close(0);

    /* ============================================================
       🔄 5) REINSERTAR INLINE CODE `...`
       ============================================================ */

    let out = html.join("\n");

    out = out.replace(/@@INLINE(\d+)@@/g, (m, i) => {
      const code = INLINE_CODE[i];
      return `<code>${code}</code>`;
    });

    /* ============================================================
       🔄 6) REINSERTAR BLOQUES DE CÓDIGO TRIPLE
       ============================================================ */

    out = out.replace(/@@BLOCK(\d+)@@/g, (m, i) => {
      const b = BLOCKS[i];
      return `\`\`\`${b.lang}\n${b.code}\`\`\``;
    });

    return out;
  }
};

