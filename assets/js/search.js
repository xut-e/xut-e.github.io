// assets/js/search.js
document.addEventListener("DOMContentLoaded", () => {
  // === Leer parámetro q ===
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.trim();
  const input = document.querySelector(".site-search-input");
  const queryDisplay = document.getElementById("search-query-display");
  const container = document.getElementById("results-container");

  if (query && input) {
    input.value = query;
    if (queryDisplay) {
      queryDisplay.innerHTML = `Resultados de la búsqueda para: <strong>${query}</strong>`;
    }
  } else if (queryDisplay) {
    queryDisplay.textContent = "Introduce un término de búsqueda para comenzar.";
  }

  if (!query) return;

  // === Configuración ===
  const INDEX_URL = "apuntes/index_full.json";

  // --- Utilidades ---
  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function highlight(text, query) {
  if (!text || !query) return text;

  // Escapar caracteres especiales
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Normalizar tildes y mayúsculas en ambos lados
  const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const regex = new RegExp(`(${escaped})`, "gi");

  // Sustitución uniforme y no acumulativa
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(regex, `<mark>$1</mark>`);
}

  function extractContext(content, query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`([^.!?\\n]*\\b${escaped}\\b[^.!?\\n]*[.!?])`, "gi");

    const matches = content.match(regex);
    if (!matches) return null;

    const main = matches[0];
    const allSentences = content.split(/(?<=[.!?])\s+/);
    const index = allSentences.findIndex(s => main.includes(s.trim()));

    const before = index > 0 ? allSentences[index - 1] : "";
    const after = index < allSentences.length - 1 ? allSentences[index + 1] : "";

    const snippet = [before, main, after].filter(Boolean).join(" ");
    return { snippet, extraCount: matches.length - 1 };
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

  async function performSearch(query) {
    container.innerHTML = "<p>Buscando...</p>";

    try {
      const res = await fetch(INDEX_URL);
      if (!res.ok) throw new Error("No se pudo cargar el índice");
      const index = await res.json();

      const normalizedQuery = normalize(query);
      const results = [];

      for (const note of index) {
        const { title, path, breadcrumb, content } = note;
        const normalizedTitle = normalize(title);
        const normalizedContent = normalize(content);

        const inTitle = normalizedTitle.includes(normalizedQuery);
        const inContent = normalizedContent.includes(normalizedQuery);

        if (inTitle || inContent) {
          let snippet = "";
          let extra = "";

          if (inTitle && !inContent) {
            // Coincidencia solo en el título: muestra 3 primeras frases
            const sentences = content.split(/(?<=[.!?])\s+/).slice(0, 3).join(" ");
            snippet = highlight(sentences, query);
          } else if (inContent) {
            const context = extractContext(content, query);
            if (context) {
              snippet = highlight(context.snippet, query);
              if (context.extraCount > 0)
                extra = `Ver ${context.extraCount} resultados más…`;
            } else {
              snippet = highlight(content.slice(0, 200) + "...", query);
            }
          }

          results.push({
            title,
            link: `markdown-viewer.html?file=${encodeURIComponent(path)}&q=${encodeURIComponent(query)}`,
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

      // Renderizar resultados
      container.innerHTML = "";
      results.forEach(r => container.appendChild(createResultCard(r)));
    } catch (err) {
      console.error("Error en búsqueda:", err);
      container.innerHTML = "<p>Error al cargar el índice de búsqueda.</p>";
    }
  }

  performSearch(query);
});

