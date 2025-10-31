// ======== generate-index.js ========
// Renderiza el árbol lateral estilo Obsidian usando /apuntes/arbol.json
// - Mantiene los números ("1. Pre Security", etc.)
// - Ordena por número natural: 1,2,3,...,10,11,...
// - Ignora .obsidian y Z Imagenes porque eso ya viene filtrado en arbol.json
// - En el último nivel jerárquico, solo ignora los .md que comienzan con "0."

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

  // 🔧 Detecta si un directorio es de último nivel (no tiene subcarpetas)
  function isLeafDirectory(node) {
    if (!node.contents) return true;
    return !node.contents.some(c => c.type === "directory");
  }

  // Construye DOM recursivamente
  function buildTree(node, parentIsLeafDir = false) {
    if (!node) return null;

    // === Directorio ===
    if (node.type === "directory") {
      const details = document.createElement("details");
      details.className = "tree-dir"; // no abrimos por defecto

      const summary = document.createElement("summary");
      summary.textContent = node.name; // mantenemos números
      summary.className = "tree-dir-label";
      details.appendChild(summary);

      const inner = document.createElement("div");
      inner.className = "tree-children";

      const children = sortNodes(node.contents || []);
      const leafDir = isLeafDirectory(node);

      children.forEach(child => {
        const childEl = buildTree(child, leafDir);
        if (childEl) inner.appendChild(childEl);
      });

      details.appendChild(inner);
      return details;
    }

    // === Archivo .md válido ===
    if (node.type === "file") {
      const isMd = node.name.toLowerCase().endsWith(".md");
      if (!isMd) return null;

      // ⛔ Ignorar solo si está en el último nivel y empieza por "0."
      if (parentIsLeafDir && /^0\./.test(node.name)) {
        console.log("⛔ Ignorado índice local:", node.path);
        return null;
      }

      const link = document.createElement("a");
      link.className = "tree-leaf";
      link.textContent = node.name.replace(/\.md$/i, ""); // quita .md visible
      link.href = `/markdown-viewer.html?file=${encodeURIComponent(node.path)}`;
      return link;
    }

    return null;
  }

  // Antes abría los dos primeros niveles. Ahora no abrimos ninguno.
  function applyDepthAndOpen(el, depth = 0) {
    if (!el) return;
    if (el.matches("details.tree-dir")) {
      el.dataset.depth = depth;
      // ❌ No abrimos ningún nivel por defecto aquí.
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
      if (linkFileNorm === currentFileNorm) currentLink = a;
    });

    if (!currentLink) {
      console.warn("⚠ No se encontró el enlace actual en el índice:", currentFileRaw);
      return;
    }

    // Quitar highlights viejos
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

    // Scroll hacia el enlace actual
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
        applyDepthAndOpen(childEl, 0); // ahora no abre nada
      }
    });

    // 🔒 Cierra todos los <details> por defecto
    const allDetails = nav.querySelectorAll("details");
    allDetails.forEach(d => (d.open = false));

    // === Cerrar las demás unidades al abrir una nueva ===
    document.addEventListener("click", e => {
      if (e.target.matches(".tree-nav summary")) {
        setTimeout(() => {
          const allDetails = document.querySelectorAll(".tree-nav details");
          allDetails.forEach(d => {
            if (d !== e.target.parentElement && !d.contains(e.target.parentElement)) {
              d.open = false;
            }
          });
        }, 50);
      }
    });

    container.appendChild(nav);

    // 🔥 Resalta solo en markdown-viewer (y abre ramas necesarias)
    highlightCurrentNote();

  } catch (err) {
    console.error("💥 Error generando índice:", err);
    container.innerHTML = `<p style="color:#f88;">Error al generar el índice.</p>`;
  }
})();

