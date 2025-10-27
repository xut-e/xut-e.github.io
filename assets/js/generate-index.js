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

  // 4. Builder recursivo
  function buildNode(node, basePath) {
    if (node.type === "directory") {
      const dirPath = basePath ? basePath + "/" + node.name : node.name;

      const details = document.createElement("details");
      details.dataset.path = dirPath;

      // restaurar abierto si estaba guardado
      if (openSet.has(dirPath)) {
        details.setAttribute("open", "");
      }

      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      const ul = document.createElement("ul");

      (node.contents || []).forEach(child => {
        const li = document.createElement("li");
        const built = buildNode(child, dirPath);
        if (built) {
          li.appendChild(built);
          ul.appendChild(li);
        }
      });

      details.appendChild(ul);

      // guardar cambios de toggle
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

      // sólo .md nos interesan
      if (!filePath.endsWith(".md")) {
        const span = document.createElement("span");
        span.textContent = node.name;
        span.style.opacity = ".5";
        return span;
      }

      // Nombre sin .md
      const fileNameNoExt = node.name.replace(/\.md$/i, "").trim();

      // === FILTRO A: archivos que empiezan por "0." ===
      if (fileNameNoExt.startsWith("0.")) {
        return null;
      }

      // === FILTRO B/C: archivos índice internos ===
      // Regla: ocultar si el nombre del archivo coincide EXACTAMENTE (case-insensitive, trim)
      // - con el nombre de la carpeta padre
      // - o con el nombre de la carpeta abuelo
      //
      // Ej: basePath = "content/Ciberseguridad/THM/2. Cyber Security 101/2. Public Key Cryptography Basics"
      //      split -> [..., "2. Cyber Security 101", "2. Public Key Cryptography Basics"]
      const pathParts = basePath ? basePath.split("/") : [];
      const parentDirName = pathParts.length > 0 ? pathParts[pathParts.length - 1].trim().toLowerCase() : "";
      const grandParentDirName = pathParts.length > 1 ? pathParts[pathParts.length - 2].trim().toLowerCase() : "";

      const fileNorm = fileNameNoExt.toLowerCase();

      // ¿coincide con la unidad / tema?
      if (parentDirName && fileNorm === parentDirName) {
        return null;
      }

      // ¿coincide con el curso / bloque superior?
      if (grandParentDirName && fileNorm === grandParentDirName) {
        return null;
      }

      // construir enlace normal
      const relativeForQuery = filePath.replace(/^content\//, "");

      const a = document.createElement("a");
      a.className = "tree-link";
      a.textContent = fileNameNoExt;
      a.href = "markdown-viewer.html?file=" + encodeURIComponent(relativeForQuery);

      // resaltar si es la página actual
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

  // 5. Elegimos raíz "content/Ciberseguridad"
  const raiz = treeData[0]?.contents || [];

  const treeWrapper = document.createElement("nav");
  treeWrapper.className = "tree-nav";

  const topUL = document.createElement("ul");

  raiz.forEach(sectionNode => {
    // saltar carpetas que no quieras mostrar
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

  // 7. Botón móvil opcional
  const toggleBtn = document.getElementById("toggle-index");
  const sidebar = document.querySelector(".sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
})();

