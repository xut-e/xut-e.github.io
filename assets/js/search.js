document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.trim();
  const input = document.querySelector(".site-search-input");
  const queryDisplay = document.getElementById("search-query-display");
  const container = document.getElementById("results-container");

  // --- mostrar el texto buscado arriba y en la caja ---
  if (query && input) {
    input.value = query;
    if (queryDisplay) {
      queryDisplay.innerHTML = `Resultados de la búsqueda para: <strong>${query}</strong>`;
    }
  } else if (queryDisplay) {
    queryDisplay.textContent = "Introduce un término de búsqueda para comenzar.";
  }

  if (!query) return;

  const INDEX_URL = "apuntes/index_full.json";

  // ---------------- utilidades ----------------
  function normalize(str) {
    return str
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .toLowerCase();
  }

  function highlight(text, query) {
    if (!text || !query) return text;

    const normText = normalize(text);
    const normQuery = normalize(query);
    const escaped = normQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");

    // recorremos el texto original y aplicamos el resaltado sobre los mismos trozos
    let output = "";
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(normText)) !== null) {
      const start = match.index;
      const end = regex.lastIndex;
      output += text.slice(lastIndex, start) + "<mark>" + text.slice(start, end) + "</mark>";
      lastIndex = end;
    }

    output += text.slice(lastIndex);
    return output;
  }

  function createResultCard({ title, link, breadcrumb, snippet, extra }) {
    const article = document.createElement("article");
    article.className = "search-result-card";
    article.innerHTML = `
      <h3><a href="${link}">${title}</a></h3>
      <p class="breadcrumb">${breadcrumb}</p>
      <p class="snippet">${snippet.replace(/\*\*/g, "")}</p>
      ${extra ? `<p class="extra">${extra}</p>` : ""}
    `;
    return article;
  }

  // ---------------- búsqueda principal ----------------
  async function performSearch(query) {
    container.innerHTML = "<p>Buscando...</p>";

    try {
      const res = await fetch(INDEX_URL);
      if (!res.ok) throw new Error("No se pudo cargar el índice");
      const index = await res.json();

      const normalizedQuery = normalize(query);
      const escaped = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Permitir coincidencias con guiones (-) o flags tipo --flag-name
      const regexBase = new RegExp(`[-]{0,2}${escaped}[\\w-]*`, "i");


      const results = [];

      for (const note of index) {
        const { title, path, breadcrumb, content } = note;
        const normTitle = normalize(title);
        const normContent = normalize(content);

        const inTitle = regexBase.test(normTitle);
        const inContent = regexBase.test(normContent);

        if (inTitle || inContent) {
          let snippet = "";
          let extra = "";

          if (inContent) {
            // buscar coincidencias en versión normalizada
            const ctxRegex = new RegExp(`.{0,120}[-]{0,2}${escaped}[\\w-]*.{0,120}`, "gi"); 
            const matches = [];
            let m;
            while ((m = ctxRegex.exec(normContent)) !== null) {
              const start = m.index;
              const end = start + m[0].length;
              const originalFragment = content.slice(
                Math.max(0, start - 20),
                Math.min(content.length, end + 20)
              );
              matches.push(originalFragment);
            }

            if (matches.length > 0) {
              snippet = highlight(matches[0], query);
              if (matches.length > 1)
                extra = `Ver ${matches.length - 1} resultados más…`;
            }
          } else if (inTitle) {
            const sentences = content.split(/(?<=[.!?])\s+/).slice(0, 3).join(" ");
            snippet = highlight(sentences, query);
          }

          results.push({
	    title,
	    // usar src (ruta original tipo content/...) si existe; si no, usar path por compatibilidad
	    link: `markdown-viewer.html?file=${encodeURIComponent(note.src || path)}&q=${encodeURIComponent(query)}`,
	    breadcrumb,
	    snippet,
	    extra,
	  });

        }
      }

      if (!results.length) {
        container.innerHTML = `<p>No se encontraron resultados para <strong>${query}</strong>.</p>`;
        return;
      }

      container.innerHTML = "";
      results.forEach(r => container.appendChild(createResultCard(r)));
    } catch (err) {
      console.error("Error en búsqueda:", err);
      container.innerHTML = "<p>Error al cargar el índice de búsqueda.</p>";
    }
  }

  performSearch(query);
});

