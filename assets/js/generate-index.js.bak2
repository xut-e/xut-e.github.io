// ======== generate-index.js ========
// Renderiza el arbol lateral estilo Obsidian usando /apuntes/arbol.json
// - Mantiene los números ("1. Pre Security", etc.)
// - Ordena por número natural: 1,2,3,...,10,11,...
// - Ignora .obsidian y Z Imagenes porque eso ya viene filtrado en arbol.json

(async function () {
  const container = document.getElementById("dynamic-index");
  if (!container) return;

  // Extrae número inicial "^\d+" del nombre ("1. Pre Security" -> 1)
  // Si no hay número delante, devolvemos null.
  function getLeadingNumber(name) {
    const m = name.match(/^(\d+)\s*[\.\-)]?\s*/);
    if (!m) return null;
    return parseInt(m[1], 10);
  }

  // Ordena arrays de nodos (carpetas y archivos) con criterio:
  // 1) si ambos tienen número => ordenar por ese número ascendente
  // 2) si uno tiene número y otro no => el que tiene número va antes
  // 3) si ninguno tiene número => alfabético normal
  function sortNodes(nodes) {
    return nodes.slice().sort((a, b) => {
      const aNum = getLeadingNumber(a.name);
      const bNum = getLeadingNumber(b.name);

      const aHas = aNum !== null;
      const bHas = bNum !== null;

      if (aHas && bHas) {
        if (aNum !== bNum) return aNum - bNum;
        // mismo número -> desempate alfabético completo
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      }

      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

      // ninguno tiene número -> alfabético
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
  }

  // Construye DOM recursivamente
  function buildTree(node) {
    if (!node) return null;

    // Directorio
    if (node.type === "directory") {
      const details = document.createElement("details");
      details.className = "tree-dir";

      // Por UX podemos abrir el primer nivel (ej: THM) por defecto
      // y subniveles cerrados. Detectamos profundidad luego.
      // Truco: almacenamos depth como data-depth opcionalmente.
      // depth lo vamos a pasar como segundo arg en la llamada.
      // Para compatibilidad, lo seteamos fuera (ver más abajo).

      const summary = document.createElement("summary");
      // ⚠️ Mantener el nombre TAL CUAL, sin .replace() que quitaba los números
      summary.textContent = node.name;
      summary.className = "tree-dir-label";
      details.appendChild(summary);

      // Contenedor interno de hijos
      const inner = document.createElement("div");
      inner.className = "tree-children";

      // Ordenamos hijos antes de pintarlos
      const children = sortNodes(node.contents || []);

      children.forEach(child => {
        const childEl = buildTree(child);
        if (childEl) inner.appendChild(childEl);
      });

      details.appendChild(inner);
      return details;
    }

    // Archivo .md válido
    if (node.type === "file") {
      const link = document.createElement("a");
      link.className = "tree-leaf";
      link.textContent = node.name.replace(/\.md$/i, ""); // quitamos .md visualmente pero mantenemos números
      link.href = `/markdown-viewer.html?file=${encodeURIComponent(node.path)}`;
      return link;
    }

    // Cualquier otra cosa no la pintamos
    return null;
  }

  // Setea depth recursivamente y abre sólo niveles superficiales (depth 0 y 1 abiertos)
  function applyDepthAndOpen(el, depth = 0) {
    if (!el) return;
    if (el.matches("details.tree-dir")) {
      el.dataset.depth = depth;
      if (depth <= 1) {
        // Abrimos los dos primeros niveles por defecto (ej: THM, Pre Career)
        el.open = true;
      }
      // Recurse a hijos
      const childWrapper = el.querySelector(":scope > .tree-children");
      if (childWrapper) {
        [...childWrapper.children].forEach(child => {
          applyDepthAndOpen(child, depth + 1);
        });
      }
    }
  }

  try {
    // Pedimos el árbol jerárquico
    const res = await fetch("/apuntes/arbol.json");
    if (!res.ok) throw new Error("No se pudo cargar /apuntes/arbol.json");

    const data = await res.json();

    // data es la raíz "Ciberseguridad"
    // Normalmente queremos mostrar sus hijos directos (ej. THM, HTB, ...)
    const rootChildren = sortNodes(data.contents || []);

    container.innerHTML = "";
    const nav = document.createElement("nav");
    nav.className = "tree-nav";

    rootChildren.forEach(child => {
      const childEl = buildTree(child);
      if (childEl) {
        nav.appendChild(childEl);
        applyDepthAndOpen(childEl, 0);
      }
    });

    container.appendChild(nav);

  } catch (err) {
    console.error("💥 Error generando índice:", err);
    container.innerHTML = `<p style="color:#f88;">Error al generar el índice.</p>`;
  }

 // === Resalta la nota actual en el índice lateral ===
window.addEventListener("DOMContentLoaded", () => {
  const currentUrl = window.location.pathname;
  document.querySelectorAll(".tree-nav a.tree-leaf").forEach(a => {
    if (a.href.endsWith(currentUrl)) {
      a.classList.add("current-page");
    }
  });
});

})();

