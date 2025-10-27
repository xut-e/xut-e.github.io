// Generador de índice dinámico a partir de un JSON con la estructura real.
// Se puede generar este JSON con un workflow o script en GitHub Actions usando `tree -J` o similar.

async function loadIndexTree() {
  try {
    // Carga el JSON de estructura real (deberás generarlo con el workflow).
    const res = await fetch("index.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No existe Ciberseguridad/index.json");
    const data = await res.json();

    const container = document.querySelector("#dynamic-index");
    container.innerHTML = "";
    const ul = buildTree(data);
    container.appendChild(ul);

    } catch (e) {
    const container = document.querySelector("#dynamic-index");
    container.innerHTML = `<p style='color:red'>
      ⚠️ Error generando el índice dinámico:<br>
      ${e.message}
    </p>`;
    console.error("Error completo generando índice:", e);
  }
 
}

function buildTree(nodes) {
  if (!nodes || !Array.isArray(nodes)) return document.createElement("ul");

  const ul = document.createElement("ul");

  for (const node of nodes) {
    if (!node || !node.name) continue; // seguridad
    if (node.name.startsWith("Z Imagenes")) continue;

    const li = document.createElement("li");

    if (node.type === "directory") {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = node.name;
      details.appendChild(summary);

      // recursión
      if (node.contents && node.contents.length > 0) {
        details.appendChild(buildTree(node.contents));
      }
      li.appendChild(details);

    } else if (node.type === "file" && node.name.endsWith(".md")) {
      const a = document.createElement("a");
      const relPath = node.path
        ? node.path.replace(/^Ciberseguridad\//, "")
        : node.name;
      a.href =
        "markdown-viewer.html?file=" +
        encodeURIComponent("Ciberseguridad/" + relPath);
      a.textContent = node.name.replace(".md", "");
      li.appendChild(a);
    }

    ul.appendChild(li);
  }

  return ul;
}


document.addEventListener("DOMContentLoaded", loadIndexTree);

