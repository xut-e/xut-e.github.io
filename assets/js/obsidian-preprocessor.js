/* ============================================================
   🔥 OBSIDIAN-LIKE PREPROCESSOR (negrita en listas)
   ============================================================ */

const ObsidianPreprocessor = {

  process(md) {

    // Normalizar saltos
    md = md.replace(/\r\n/g, "\n").replace(/\t/g, "    ");

    /* ============================================================
       1) PROTEGER BLOQUES DE CÓDIGO TRIPLE
       ============================================================ */

    const BLOCKS = [];

    md = md.replace(
      /^[ \t]*```[ \t]*([^\n]*)\n([\s\S]*?)(^[ \t]*```[ \t]*$)/gm,
      (full, lang, code) => {
        const i = BLOCKS.length;

        BLOCKS.push({
          lang: (lang || "").trim(),
          code: code.replace(/\n$/, "")
        });

        return `@@BLOCK${i}@@`;
      }
    );

    /* ============================================================
       2) PROTEGER INLINE CODE `...` (pero NO usarlo luego en listas)
       ============================================================ */

    const INLINE = [];

    md = md.replace(/`([^`]+)`/g, (m, code) => {
      const i = INLINE.length;
      INLINE.push(code);
      return `@@INLINE${i}@@`;
    });

    /* ============================================================
       3) Imágenes Obsidian
       ============================================================ */

    md = md.replace(/!\[\[(.+?)\]\]/g, (m, file) =>
      `<img class="md-img" src="/content/Ciberseguridad/Ciberseguridad/Z%20Imagenes/${encodeURIComponent(
        file.trim()
      )}" alt="${file.trim()}">`
    );

    /* ============================================================
       4) HR
       ============================================================ */

    md = md.replace(/^[-]{3,}$/gm, "<hr>");

    /* ============================================================
       5) Restaurar inline code (solo backticks)
       ============================================================ */

    md = md.replace(/@@INLINE(\d+)@@/g, (m, i) => '`' + INLINE[i] + '`');

    /* ============================================================
       6) Restaurar bloques de código
       ============================================================ */

    md = md.replace(/@@BLOCK(\d+)@@/g, (m, i) => {
      const b = BLOCKS[i];
      return `\n\`\`\`${b.lang}\n${b.code}\n\`\`\`\n`;
    });

    /* ============================================================
       7) Enlaces markdown
       ============================================================ */

    md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) =>
      `<a href="${url.trim()}" target="_blank" rel="noopener">${text.trim()}</a>`
    );

    /* ============================================================
       8) PROCESADO MANUAL DE LISTAS
       ============================================================ */

    const lines = md.split("\n");
    let out = [];
    let stack = [];

    function open(type, level) {
      if (type === "olist") {
        out.push(`<div class="olist-level olist-level-${level}">`);
        stack.push("olist");
      } else {
        out.push(`<ul class="ulist-level ulist-level-${level}">`);
        stack.push("ulist");
      }
    }

    function close(level) {
      while (stack.length > level) {
        const t = stack.pop();
        out.push(t === "olist" ? "</div>" : "</ul>");
      }
    }

    function applyBold(text) {
      return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    }

    for (let raw of lines) {
      const match = raw.match(/^( +)/);
      const spaces = match ? match[1].length : 0;
      const level = Math.floor(spaces / 4);
      let trimmed = raw.trim();

      // aplicar negrita ANTES de envolver en HTML
      trimmed = applyBold(trimmed);

      /* ===== Ordered list ===== */
      const ol = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (ol) {
        close(level);
        if (stack.length === level) open("olist", level);
        out.push(`<div class="olist-item" data-number="${ol[1]}">${ol[2]}</div>`);
        continue;
      }

      /* ===== Unordered list ===== */
      const ul = trimmed.match(/^[-+*]\s+(.*)$/);
      if (ul) {
        close(level);
        if (stack.length === level) open("ulist", level);
        out.push(`<div class="ulist-item">${ul[1]}</div>`);
        continue;
      }

      /* ===== Texto dentro de lista ===== */
      if (stack.length > 0 && trimmed !== "") {
        out.push(`<p>${trimmed}</p>`);
        continue;
      }

      /* ===== Línea normal ===== */
      close(0);
      out.push(trimmed);
    }

    close(0);

    return out.join("\n");
  }
};

