/* ============================================================
   🔥 OBSIDIAN-LIKE PREPROCESSOR
   Reconstruye listas, sublistas, imágenes y párrafos exactamente
   como Obsidian, ANTES de markdown-it.
   ============================================================ */

const ObsidianPreprocessor = {

  process(md) {

    // Normalizar saltos y tabs → tabs = 4 spaces
    md = md.replace(/\r\n/g, "\n")
           .replace(/\t/g, "    ");

    /* ==================================================================
       🔒 PROTEGER INLINE CODE `...`
       ================================================================== */
    const INLINE_CODE = [];
    md = md.replace(/`([^`]+)`/g, (m, code) => {
      const placeholder = `@@INLINECODE${INLINE_CODE.length}@@`;
      INLINE_CODE.push(code);
      return placeholder;
    });

    /* ==================================================================
       🖼 Sustituir imágenes Obsidian ![[file.png]]
       ================================================================== */
    md = md.replace(/!\[\[(.+?)\]\]/g, (m, file) =>
      `<img class="md-img" src="/content/Ciberseguridad/Ciberseguridad/Z%20Imagenes/${encodeURIComponent(file.trim())}" alt="${file.trim()}">`
    );

    /* ==================================================================
       ─── HR: líneas horizontales ─────────────────────────────────────
       ================================================================== */
    md = md.replace(/^[-]{3,}$/gm, "<hr>");

    /* ==================================================================
       🔧 PREPROCESADO MANUAL DE LISTAS (versión Obsidian 100%)
       ================================================================== */

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
      let matchSpaces = raw.match(/^( +)/);
      let spaces = matchSpaces ? matchSpaces[0].length : 0;

      // REGLA OBSIDIAN: solo 4 espacios = 1 nivel
      let level = Math.floor(spaces / 4);

      let trimmed = raw.trim();

      /* ===== Ordered list ===== */
      let ol = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (ol) {
        close(level);
        if (stack.length === level) open("olist", level);
        html.push(`<div class="olist-item" data-number="${ol[1]}">${ol[2]}</div>`);
        continue;
      }

      /* ===== Unordered list ===== */
      let ul = trimmed.match(/^[-+*]\s+(.*)$/);
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

    /* ==================================================================
       🔄 REINSERTAR INLINE CODE PROTEGIDO
       ================================================================== */
    let out = html.join("\n");

    out = out.replace(/@@INLINECODE(\d+)@@/g, (m, i) => {
      const code = INLINE_CODE[i];
      return `<code>${code}</code>`;
    });

    return out;
  }
};

