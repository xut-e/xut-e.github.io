(async function () {
  console.group("🧠 Últimos apuntes – depuración (blog view)");

  try {
    console.log("📡 Cargando index_full.json...");
    const res = await fetch("apuntes/index_full.json");

    if (!res.ok) {
      console.error("❌ No se pudo cargar index_full.json:", res.status, res.statusText);
      throw new Error("No se pudo cargar el JSON");
    }

    const data = await res.json();
    console.log(`✅ JSON cargado correctamente (${data.length} notas encontradas).`);

    // Convertir el campo modified en objeto Date
    data.forEach(n => {
      n._modified = new Date(n.modified);
      if (isNaN(n._modified)) {
        console.warn(`⚠️ Fecha inválida en: ${n.title}`, n.modified);
      }
    });

    // Ordenar globalmente por fecha más reciente
    const sorted = [...data].sort((a, b) => b._modified - a._modified);

    // Tomar las 5 últimas notas
    const latestNotes = sorted.slice(0, 5);
    console.table(
      latestNotes.map(n => ({
        Título: n.title,
        Modificado: n.modified,
        Ruta: n.src
      }))
    );

    // Contenedor del bloque
    const container = document.getElementById("latest-posts");
    if (!container) {
      console.error("❌ No se encontró el contenedor #latest-posts en el HTML.");
      return;
    }

    container.innerHTML = "";

    if (latestNotes.length === 0) {
      container.innerHTML = "<li>No hay notas recientes.</li>";
      console.warn("⚠️ No hay notas con fechas válidas para mostrar.");
      console.groupEnd();
      return;
    }

    latestNotes.forEach(note => {
      const li = document.createElement("li");
      li.classList.add("latest-note");

      // --- título principal ---
      const a = document.createElement("a");
      a.href = `markdown-viewer.html?file=${note.src}`;
      a.classList.add("latest-note-title");
      a.textContent = note.title;

      // --- fecha ---
      const date = note._modified;
      const time = document.createElement("span");
      time.classList.add("latest-note-date");
      time.textContent = date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // --- preview del contenido ---
      let previewText = note.content
        .replace(/[#>*_`[\]]/g, "") // quita markdown
        .split(/\s+/)
        .slice(0, 25)
        .join(" ")
        .trim();
      if (previewText.length > 0) previewText += "…";

      const preview = document.createElement("p");
      preview.classList.add("latest-note-preview");
      preview.textContent = previewText;

      // --- composición ---
      li.appendChild(a);
      li.appendChild(time);
      li.appendChild(preview);
      container.appendChild(li);
    });

    console.log(`🟢 Mostradas ${latestNotes.length} notas recientes en la página.`);
  } catch (err) {
    console.error("💥 Error al procesar las notas recientes:", err);
    const container = document.getElementById("latest-posts");
    if (container) {
      container.innerHTML = "<li>Error cargando las notas recientes.</li>";
    }
  } finally {
    console.groupEnd();
  }
})();

