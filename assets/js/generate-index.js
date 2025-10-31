// ======== generate-index.js ========
// Carga /apuntes/arbol.json y genera un índice jerárquico tipo Obsidian

(async function () {
  const container = document.getElementById("dynamic-index");
  if (!container) return;

  try {
    const res = await fetch("/apuntes/arbol.json");
    if (!res.ok) throw new Error("No se pudo cargar /apuntes/arbol.json");

    const data = await res.json();

    // Función recursiva para construir el árbol HTML
    function buildTree(node) {
      if (!node || node.name === "Z Imagenes") return null;

      // Si es un directorio
      if (node.type === "directory") {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = node.name.replace(/^\d+\.\s*/, ""); // quita número inicial
        details.appendChild(summary);

        // Hacer recursión sobre los hijos
        const childrenContainer = document.createElement("div");
        (node.contents || []).forEach(child => {
          const childEl = buildTree(child);
          if (childEl) childrenContainer.appendChild(childEl);
        });

        details.appendChild(childrenContainer);
        return details;
      }

      // Si es un archivo Markdown válido
      if (node.type === "file" && node.name.endsWith(".md")) {
        const fileName = node.name.replace(/\.md$/, "");
        const parentName = node.parent || "";

        // === reglas de exclusión ===
        if (fileName.startsWith("0.")) return null; // ignora índices 0.
        const cleanFile = fileName.replace(/^\d+\.\s*/, "").trim().toLowerCase();
        const cleanParent = parentName.replace(/^\d+\.\s*/, "").trim().toLowerCase();
        if (cleanFile === cleanParent) return null; // ignora si coincide con carpeta padre

        // === crear enlace válido ===
        const a = document.createElement("a");
        a.textContent = fileName;
        a.href = `/markdown-viewer.html?file=${encodeURIComponent(node.path)}`;
        a.className = "tree-link";
        return a;
      }

      return null; // otros tipos se ignoran
    }

    // Procesa desde el nodo raíz
    container.innerHTML = "";
    const nav = document.createElement("nav");
    nav.className = "tree-nav";

    (data.contents || []).forEach(child => {
      const el = buildTree(child);
      if (el) nav.appendChild(el);
    });

    container.appendChild(nav);
  } catch (err) {
    console.error("💥 Error generando índice:", err);
    container.innerHTML = `<p style="color:#f88;">Error al generar el índice.</p>`;
  }
})();

