// ==============================
// ÍNDICE DINÁMICO - ESTILO OBSIDIAN
// ==============================

async function loadIndexTree() {
  try {
    const res = await fetch("index.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No existe index.json");
    const data = await res.json();

    const container = document.querySelector("#dynamic-index");
    container.innerHTML = "";

    // Navegar hasta el contenido de Ciberseguridad
    const root = Array.isArray(data) ? data[0].contents : data.contents;
    const ciberseg = root.find(d => d.name === "THM" || d.name === "Ciberseguridad") || root[0];

    const ul = buildTree([ciberseg]);
    ul.classList.add("tree-nav");
    container.appendChild(ul);
  } catch (e) {
    const container = document.querySelector("#dynamic-index");
    container.innerHTML = `<p style='color:red'>
      ⚠ Error generando el índice:<br>${e.message}
    </p>`;
    console.error("Error generando índice dinámico:", e);
  }
}

// Comparador natural humano
function naturalCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Determina si un nodo debe mostrarse
function isVisibleNode(node) {
  if (!node || !node.name) return false;
  if (node.name.startsWith("Z Imagenes")) return false;
  if (node.type === "file" && (!node.name.endsWith(".md") || node.name.startsWith("0."))) return false;
  return true;
}

function buildTree(nodes, parentPath = "") {
  if (!nodes || !Array.isArray(nodes)) return document.createElement("ul");

  // Ordenar humanamente
  nodes.sort((a, b) => naturalCompare(a.name, b.name));

  const ul = document.createElement("ul");

  for (const node of nodes) {
    if (!isVisibleNode(node)) continue;

    const li = document.createElement("li");
    const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

    if (node.type === "directory") {
      const visibleChildren = (node.contents || []).filter(isVisibleNode);
      if (visibleChildren.length === 0) continue;

      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      // Abrir automáticamente niveles 1 y 2
      if (parentPath.split("/").length < 3) details.open = true;

      details.appendChild(buildTree(visibleChildren, fullPath));
      li.appendChild(details);

    } else if (node.type === "file" && node.name.endsWith(".md")) {
      const parentFolder = parentPath.split("/").pop() || "";
      const cleanName = node.name.replace(".md", "");

      // omitir índices internos
      if (cleanName === parentFolder || cleanName.startsWith("0.")) continue;

      const a = document.createElement("a");
      a.textContent = cleanName;
      a.href = "markdown-viewer.html?file=" + encodeURIComponent("Ciberseguridad/" + fullPath);
      a.className = "tree-link";
      li.appendChild(a);
    }

    ul.appendChild(li);
  }

  return ul;
}

// ==============================
// TOGGLE DEL PANEL Y ESTADO GUARDADO
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#toggle-index");
  const sidebar = document.querySelector(".sidebar");

  const savedState = localStorage.getItem("sidebarOpen") === "true";
  if (savedState) sidebar.classList.add("open");

  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      localStorage.setItem("sidebarOpen", sidebar.classList.contains("open"));
    });
  }

  loadIndexTree();
});

