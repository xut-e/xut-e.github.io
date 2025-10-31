// ======== generate-index.js ========
// Renderiza el arbol lateral estilo Obsidian usando /apuntes/arbol.json
// - Mantiene los números ("1. Pre Security", etc.)
// - Ordena por número natural: 1,2,3,...,10,11,...
// - Ignora .obsidian y Z Imagenes porque eso ya viene filtrado en arbol.json

(async function () {
  const container = document.getElementById("dynamic-index");
  if (!container) return;

  // Extrae número inicial "^\d+" del nombre ("1. Pre Security" -> 1)
  function getLeadingNumber(name) {
    const m = name.match(/^(\d+)\s*[\.\-)]?\s*/);
    if (!m) return null;
    return parseInt(m[1], 10);
  }

  // Ordena arrays de nodos (carpetas y archivos)
  function sortNodes(nodes) {
    return nodes.slice().sort((a, b) => {
      const aNum = getLeadingNumber(a.name);
      const bNum = getLeadingNumber(b.name);
      const aHas = aNum !== null;
      const bHas = bNum !== null;

      if (aHas && bHas) {
        if (aNum !== bNum) return aNum - bNum;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
      }

      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

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

      const summary = document.createElement("summary");
      summary.textContent = node.name; // mantenemos números
      summary.className = "tree-dir-label";
      details.appendChild(summary);

      const inner = document.createElement("div");
      inner.className = "tree-children";

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
      link.textContent = node.name.replace(/\.md$/i, ""); // quita .md visible
      link.href = `/markdown-viewer.html?file=${encodeURIComponent(node.path)}`;
      return link;
    }

    return null;
  }

  // Abre los dos primeros niveles de <details>
  function applyDepthAndOpen(el, depth = 0) {
    if (!el) return;
    if (el.matches("details.tree-dir")) {
      el.dataset.depth = depth;
      if (depth <= 1) {
        el.open = true;
      }
      const childWrapper = el.querySelector(":scope > .tree-children");
      if (childWrapper) {
        [...childWrapper.children].forEach(child => {
          applyDepthAndOpen(child, depth + 1);
        });
      }
    }
  }

  // === Marca la nota actual y abre su cadena de <details>
  function highlightCurrentNote() {
    // Sólo en markdown-viewer.html queremos resaltar
    const isMarkdownViewer = window.location.pathname.includes("markdown-viewer.html");
    if (!isMarkdownViewer) return;

    const urlNow = new URL(window.location.href);
    const currentFileRaw = urlNow.searchParams.get("file");
    if (!currentFileRaw) return;

    // normalizador robusto
    const normalize = str =>
      decodeURIComponent(str || "")
        .replace(/\\/g, "/")
        .replace(/%2F/gi, "/")
        .replace(/%20/gi, " ")
        .trim()
        .toLowerCase();

    const currentFileNorm = normalize(currentFileRaw);

    // Recorremos todos los enlaces ya insertados en el índice
    const links = container.querySelectorAll(".tree-nav a.tree-leaf");

    let currentLink = null;

    links.forEach(a => {
      const linkUrl = new URL(a.href, window.location.origin);
      const linkFileRaw = linkUrl.searchParams.get("file") || "";
      const linkFileNorm = normalize(linkFileRaw);

      // Coincidimos por igualdad normalizada
      if (linkFileNorm === currentFileNorm) {
        currentLink = a;
      }
    });

    if (!currentLink) {
      console.warn("⚠️ No se encontró el enlace actual en el índice:", currentFileRaw);
      return;
    }

    // Quitar highlights viejos si hubiera
    container.querySelectorAll(".tree-nav a.tree-leaf.current-page")
      .forEach(el => el.classList.remove("current-page"));

    // Marcar el actual
    currentLink.classList.add("current-page");

    // Abrir sólo sus ramas padre
    let parent = currentLink.closest("details");
    while (parent) {
      parent.open = true;
      parent = parent.parentElement?.closest("details");
    }

    // Scroll hacia el enlace actual para centrarlo
    setTimeout(() => {
      currentLink.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  try {
    // Pedimos el árbol jerárquico
    const res = await fetch("/apuntes/arbol.json");
    if (!res.ok) throw new Error("No se pudo cargar /apuntes/arbol.json");

    const data = await res.json();

    // Hijos directos del nodo raíz (ej. THM, HTB...)
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

    // === Cerrar las demás unidades al abrir una nueva ===
document.addEventListener("click", e => {
  if (e.target.matches(".tree-nav summary")) {
    // Esperar un tick para que se actualice el estado 'open'
    setTimeout(() => {
      const allDetails = document.querySelectorAll(".tree-nav details");
      allDetails.forEach(d => {
        // Si no es el mismo <details> ni un ancestro de la carpeta clicada → se colapsa
        if (d !== e.target.parentElement && !d.contains(e.target.parentElement)) {
          d.open = false;
        }
      });
    }, 50);
  }
});


    container.appendChild(nav);

    // 🔥 IMPORTANTE: ahora que ya existe el árbol en el DOM → resalta
    highlightCurrentNote();

  } catch (err) {
    console.error("💥 Error generando índice:", err);
    container.innerHTML = `<p style="color:#f88;">Error al generar el índice.</p>`;
  }

})();

