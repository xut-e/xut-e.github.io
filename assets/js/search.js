// assets/js/search.js
document.addEventListener("DOMContentLoaded", () => {
  // === Leer parámetro q ===
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q")?.trim();
  const input = document.querySelector(".site-search-input");
  const queryDisplay = document.getElementById("search-query-display");

  if (query && input) {
    input.value = query;
    if (queryDisplay) {
      queryDisplay.innerHTML = `Resultados de la búsqueda para: <strong>${query}</strong>`;
    }
  } else if (queryDisplay) {
    queryDisplay.textContent = "Introduce un término de búsqueda para comenzar.";
  }

  if (!query) return;

  // === Búsqueda en index.json ===
  const INDEX_URL = "apuntes/index.json";

  async function fetchIndex() {
    try {
      const res = await fetch(INDEX_URL);
      if (!res.ok) throw new Error("No se pudo cargar el índice");
      return await res.json();
    } catch (err) {
      console.error("Error cargando índice:", err);
      return [];
    }
  }

  function normalize(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function createResultCard({ title, link, breadcrumb }) {
    const article = document.createElement("article");
    article.className = "search-result-card";

    article.innerHTML = `
      <h3><a href="${link}">${title}</a></h3>
      <p class="breadcrumb">${breadcrumb}</p>
      <p class="snippet">Coincidencia en el título o la ruta del apunte.</p>
    `;
    return article;
  }

  async function performSearch(query) {
    const container = document.getElementById("results-container");
    container.innerHTML = "<p>Buscando...</p>";

    const index = await fetchIndex();
    if (!index.length) {
      container.innerHTML = "<p>No se pudo cargar el índice de apuntes.</p>";
      return;
    }

    const normalizedQuery = normalize(query);
    const results = [];

    for (const note of index) {
      const title = note.title || "";
      const path = note.path || "";
      const breadcrumb = note.breadcrumb || "";

      const hayCoincidencia =
        normalize(title).includes(normalizedQuery) ||
        normalize(path).includes(normalizedQuery);

      if (hayCoincidencia) {
        results.push({
          title,
          link: `markdown-viewer.html?file=${encodeURIComponent(path)}&q=${encodeURIComponent(query)}`,
          breadcrumb: path.replace(/^apuntes\//, "").replace(/\//g, " > "),
        });
      }
    }

    if (!results.length) {
      container.innerHTML = `<p>No se encontraron resultados para <strong>${query}</strong>.</p>`;
      return;
    }

    // renderizar
    container.innerHTML = "";
    results.forEach(r => container.appendChild(createResultCard(r)));
  }

  performSearch(query);
});

