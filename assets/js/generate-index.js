// assets/js/generate-index.js

(async function () {
  const sidebarContainer = document.getElementById("dynamic-index");
  if (!sidebarContainer) return;

  // 1. Cargar índice
  let treeData;
  try {
    const res = await fetch("index.json");
    treeData = await res.json();
  } catch (err) {
    sidebarContainer.innerHTML = "<p style='color:red;'>No se pudo cargar el índice.</p>";
    return;
  }

  // 2. Estado abierto/cerrado en localStorage
  const OPEN_KEY = "indiceOpenPaths";

  function loadOpenSet() {
    try {
      return new Set(JSON.parse(localStorage.getItem(OPEN_KEY) || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveOpenSet(set) {
    localStorage.setItem(OPEN_KEY, JSON.stringify([...set]));
  }

  const openSet = loadOpenSet();

  // 3. Detectar qué archivo estoy viendo ahora, para resaltarlo
  const params = new URLSearchParams(window.location.search);
  let currentFile = params.get("file");
  if (currentFile && !currentFile.startsWith("content/")) {
    currentFile = "content/" + currentFile;
  }

  function normalizePath(p) {
    return p
      .replace(/^\.?\/*/, "") // quita "./" o "/" inicial
      .replace(/%2F/gi, "/")
      .replace(/\s+/g, " ")
      .trim();
  }

  const currentNorm = currentFile ? normalizePath(currentFile) : null;

  // === ORDEN NATURAL ===========================================
  function leadingNumber(name) {
    const match = name.trim().match(/^(\d+)[\.\)]?\s*/);
    if (!match) return null;
    const numStr = match[1];
    let n = 0;
    for (let i = 0; i < numStr.length; i++) {
      n = n * 10 + (numStr.charCodeAt(i) - 48);
    }
    return n;
  }

  function sortContentsNatural(list) {
    return [...list].sort((a, b) => {
      const aName = a.name || "";
      const bName = b.name || "";

      const aNum = leadingNumber(aName);
      const bNum = leadingNumber(bName);

      const aHas = aNum !== null;
      const bHas = bNum !== null;

      if (aHas && bHas) {
        if (aNum !== bNum) return aNum - bNum;
        return aName.localeCompare(bName, "es", { numeric: true, sensitivity: "base" });
      }

      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;

      return aName.localeCompare(bName, "es", { numeric: true, sensitivity: "base" });
    });
  }
  // =============================================================

  // 4. Builder recursivo
  function buildNode(node, basePath) {
    if (node.type === "directory") {
      const dirPath = basePath ? basePath + "/" + node.name : node.name;

      const details = document.createElement("details");
      details.dataset.path = dirPath;

      if (openSet.has(dirPath)) {
        details.setAttribute("open", "");
      }

      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      const ul = document.createElement("ul");

      const orderedChildren = sortContentsNatural(node.contents || []);

      orderedChildren.forEach(child => {
        const li = document.createElement("li");
        const built = buildNode(child, dirPath);
        if (built) {
          li.appendChild(built);
          ul.appendChild(li);
        }
      });

      details.appendChild(ul);

      details.addEventListener("toggle", () => {
        if (details.open) {
          openSet.add(dirPath);
        } else {
          openSet.delete(dirPath);
        }
        saveOpenSet(openSet);
      });

      return details;
    }

    if (node.type === "file") {
      const filePath = basePath ? basePath + "/" + node.name : node.name;

      // extensión (lowercase)
      const lowerName = node.name.toLowerCase();

      const isMarkdown = lowerName.endsWith(".md");
      const isPDF = lowerName.endsWith(".pdf");

      // si no es ni .md ni .pdf → lo seguimos enseñando como gris sin link
      if (!isMarkdown && !isPDF) {
        const span = document.createElement("span");
        span.textContent = node.name;
        span.style.opacity = ".5";
        return span;
      }

      // nombre visible sin .md/.pdf
      const fileNameNoExt = node.name
        .replace(/\.md$/i, "")
        .replace(/\.pdf$/i, "")
        .trim();

      // === FILTROS SOLO PARA MD (para no ocultar PDFs útiles) ===
      if (isMarkdown) {
        // A: "0. ..." -> ocultar
        if (fileNameNoExt.startsWith("0.")) {
          return null;
        }

        // B/C: archivo índice con nombre = carpeta padre o abuelo
        const pathParts = basePath ? basePath.split("/") : [];
        const parentDirName = pathParts.length > 0 ? pathParts[pathParts.length - 1].trim().toLowerCase() : "";
        const grandParentDirName = pathParts.length > 1 ? pathParts[pathParts.length - 2].trim().toLowerCase() : "";

        const fileNorm = fileNameNoExt.toLowerCase();

        if (parentDirName && fileNorm === parentDirName) {
          return null;
        }
        if (grandParentDirName && fileNorm === grandParentDirName) {
          return null;
        }
      }
      // === fin filtros ===

      // construimos href hacia el visor. para pdf también usamos markdown-viewer.html
      const relativeForQuery = filePath.replace(/^content\//, "");

      const a = document.createElement("a");
      a.className = "tree-link";
      a.textContent = fileNameNoExt;
      a.href = "markdown-viewer.html?file=" + encodeURIComponent(relativeForQuery);

      // resaltar archivo actual si coincide la ruta normalizada
      if (currentNorm && normalizePath(filePath) === currentNorm) {
        a.classList.add("current-page");
      }

      return a;
    }

    // fallback
    const span = document.createElement("span");
    span.textContent = node.name || "(?)";
    return span;
  }

  // 5. Montar raíz "content/Ciberseguridad"
  const raiz = treeData[0]?.contents || [];

  const treeWrapper = document.createElement("nav");
  treeWrapper.className = "tree-nav";

  const topUL = document.createElement("ul");

  sortContentsNatural(raiz).forEach(sectionNode => {
    if (sectionNode.name === "Z Imagenes") return;
    if (sectionNode.type !== "directory") return;

    const li = document.createElement("li");
    const built = buildNode(sectionNode, "content/Ciberseguridad");
    if (built) {
      li.appendChild(built);
      topUL.appendChild(li);
    }
  });

  treeWrapper.appendChild(topUL);

  // 6. Pintar en el sidebar
  sidebarContainer.innerHTML = "";
  sidebarContainer.appendChild(treeWrapper);

  
})();

