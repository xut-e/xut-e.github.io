// assets/js/generate-index.js

(async function () {
  const sidebarContainer = document.getElementById("dynamic-index");
  if (!sidebarContainer) return;

  // 1. Cargamos índice bruto
  let treeData;
  try {
    const res = await fetch("index.json");
    treeData = await res.json();
  } catch (err) {
    sidebarContainer.innerHTML = "<p style='color:red;'>No se pudo cargar el índice.</p>";
    return;
  }

  // 2. LocalStorage helpers
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

  // 3. ¿Qué archivo estoy viendo ahora? (para resaltar en verde pastel)
  //    En index.html no hay ?file=..., así que será null
  const params = new URLSearchParams(window.location.search);
  let currentFile = params.get("file"); // ejemplo: "Ciberseguridad/THM/.../4. Diffie-Hellman Key Exchange.md"
  if (currentFile && !currentFile.startsWith("content/")) {
    currentFile = "content/" + currentFile;
  }

  // Normalizamos para poder comparar rutas absolutas reales
  function normalizePath(p) {
    return p
      .replace(/^\.?\/*/, "")         // quita "./" o "/" inicial
      .replace(/%2F/gi, "/")          // por si viene urlencoded
      .replace(/\s+/g, " ")           // colapsa espacios raros
      .trim();
  }
  const currentNorm = currentFile ? normalizePath(currentFile) : null;

  // 4. Construir árbol DOM recursivamente
  //    node = objeto de index.json (type, name, contents[])
  //    basePath = ruta acumulada tipo "content/Ciberseguridad/THM/..."
  function buildNode(node, basePath) {
    if (node.type === "directory") {
      const dirPath = basePath ? basePath + "/" + node.name : node.name;

      const details = document.createElement("details");
      details.dataset.path = dirPath;

      // restaurar estado abierto desde localStorage:
      if (openSet.has(dirPath)) {
        details.setAttribute("open", "");
      }

      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      const ul = document.createElement("ul");

      (node.contents || []).forEach(child => {
        const li = document.createElement("li");
        li.appendChild(buildNode(child, dirPath));
        ul.appendChild(li);
      });

      details.appendChild(ul);

      // cuando el usuario abre/cierra, guardamos
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

      // sólo nos interesan .md
      if (!filePath.endsWith(".md")) {
        const span = document.createElement("span");
        span.textContent = node.name;
        span.style.opacity = ".5";
        return span;
      }

      // construimos href hacia markdown-viewer con ?file=<ruta SIN "content/">
      // porque en markdown-viewer.js luego le volvemos a anteponer "content/"
      const relativeForQuery = filePath.replace(/^content\//, "");

      const a = document.createElement("a");
      a.className = "tree-link";
      a.textContent = node.name.replace(/\.md$/, "");
      a.href = "markdown-viewer.html?file=" + encodeURIComponent(relativeForQuery);

      // resaltar el archivo actual
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

  // 5. Sólo queremos la parte "Ciberseguridad" del JSON gigante
  // El JSON raíz es un array [ {type:"directory",name:"." ...}, {...report...} ]
  // Dentro de ".", hay "THM", "2. Cyber Security 101", etc.
  // Pero en tu disco real todo está dentro de /content/Ciberseguridad/
  //
  // Truco: vamos a envolver todo bajo "content/Ciberseguridad" para que las rutas queden bien.
  //
  // Buscamos el nodo raíz "THM", "2. Cyber Security 101", etc. y lo montamos con basePath="content/Ciberseguridad"
  const raiz = treeData[0]?.contents || [];

  const treeWrapper = document.createElement("nav");
  treeWrapper.className = "tree-nav";

  const topUL = document.createElement("ul");

  raiz.forEach(sectionNode => {
    // ignorar "Z Imagenes" y similares que no son apuntes
    if (sectionNode.name === "Z Imagenes") return;
    if (sectionNode.type !== "directory") return;

    const li = document.createElement("li");
    li.appendChild(buildNode(sectionNode, "content/Ciberseguridad"));
    topUL.appendChild(li);
  });

  treeWrapper.appendChild(topUL);

  // 6. Inyectar en el sidebar
  sidebarContainer.innerHTML = "";
  sidebarContainer.appendChild(treeWrapper);

  // 7. Soporte botón flotante ☰ (móvil)
  const toggleBtn = document.getElementById("toggle-index");
  const sidebar = document.querySelector(".sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
})();

