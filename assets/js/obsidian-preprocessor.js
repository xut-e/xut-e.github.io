/* ============================================================
   🔥 OBSIDIAN-LIKE PREPROCESSOR
   Reconstruye listas, sublistas, imágenes y párrafos exactamente
   como Obsidian, ANTES de markdown-it.
   ============================================================ */

const ObsidianPreprocessor = {

  process(md) {
    // Normalizar saltos y tabs
    md = md.replace(/\r\n/g, "\n")
           .replace(/\t/g, "    ");

    // Sustituir imágenes Obsidian ![[...]] por HTML embebido
    md = md.replace(/!\[\[(.+?)\]\]/g, (m, file) =>
      `<img class="md-img" src="/content/Ciberseguridad/Ciberseguridad/Z%20Imagenes/${encodeURIComponent(file.trim())}" alt="${file.trim()}">`
    );

    // Línea horizontal
    md = md.replace(/^[-]{3,}$/gm, "<hr>");

    const lines = md.split("\n");
    let html = [];
    let stack = []; // tipo de listas abiertas: "ol" o "ul"

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
    let t = stack.pop();
    html.push(`</div>`);
  }
}


    for (let raw of lines) {
      let indent = raw.match(/^\s*/)[0].length;
      let level = Math.floor(indent / 4);
      let trimmed = raw.trim();

      // Ordered list item
      let ol = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (ol) {
  close(level);
  if (stack.length === level) open("olist", level);

  html.push(
    `<div class="olist-item" data-number="${ol[1]}">${ol[2]}</div>`
  );
  continue;
}


      // Unordered list item
      let ul = trimmed.match(/^[-+*]\s+(.*)$/);
      if (ul) {
        close(level);
        if (stack.length === level) open("ul");
        html.push(`<div class="ulist-item">- ${ul[1]}</div>`);
        continue;
      }

      // Texto dentro de un li
      if (stack.length > 0 && trimmed.length > 0) {
        html.push(`<p>${trimmed}</p>`);
        continue;
      }

      // Línea normal
      close(0);
      html.push(trimmed);
    }

    close(0);
    return html.join("\n");
  }
};

