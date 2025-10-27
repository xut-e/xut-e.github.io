// Generador de índice dinámico a partir de un JSON con la estructura real.
// Se puede generar este JSON con un workflow o script en GitHub Actions usando `tree -J` o similar.

async function loadIndexTree() {
  try {
    // Carga el JSON de estructura real (deberás generarlo con el workflow).
    const res = await fetch("content/Ciberseguridad/index.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No existe Ciberseguridad/index.json");
    const data = await res.json();

    const container = document.querySelector("#dynamic-index");
    container.innerHTML = "";
    const ul = buildTree(data);
    container.appendChild(ul);

  } catch (e) {
    console.error("Error generando índice:", e);
    document.querySelector("#dynamic-index").innerHTML = "<p style='color:red'>No se pudo generar el índice dinámico.</p>";
  }
}

function buildTree(nodes) {
  const ul = document.createElement("ul");
  for (const node of nodes) {
    // Ignoramos imágenes
    if (node.name.startsWith("Z Imagenes")) continue;

    const li = document.createElement("li");

    if (node.type === "directory") {
      const details = document.createElement("details");
      if (node.level <= 2) details.open = true; // expandir los primeros niveles
      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      if (node.children && node.children.length) {
        details.appendChild(buildTree(node.children));
      }
      li.appendChild(details);
    } else if (node.type === "file" && node.name.endsWith(".md")) {
      const a = document.createElement("a");
      const relPath = node.path.replace(/^Ciberseguridad\//, "");
      a.href = "markdown-viewer.html?file=" + encodeURIComponent("Ciberseguridad/" + relPath);
      a.textContent = node.name.replace(".md", "");
      li.appendChild(a);
    }

    ul.appendChild(li);
  }
  return ul;
}

document.addEventListener("DOMContentLoaded", loadIndexTree);

