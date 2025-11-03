(async function () {
  console.group("🧠 Últimos apuntes – corrección Ciberseguridad y rutas finales");

  try {
    console.log("📡 Cargando index_full.json...");
    const res = await fetch("apuntes/index_full.json");
    if (!res.ok) throw new Error(`No se pudo cargar index_full.json (${res.status})`);

    let data = await res.json();
    console.log(`✅ JSON cargado correctamente (${data.length} elementos)`);

    // === FILTRADO ===
    data = data.filter(note => {
      const src = note.src;
      const srcLower = src.toLowerCase();

      // Ignorar carpetas o archivos innecesarios
      if (srcLower.includes("/z imagenes/")) return false;
      if (srcLower.includes(".obsidian")) return false;

      const parts = src.split("/");
      const filename = parts.at(-1).replace(".md", "").trim();
      const parent = parts.at(-2)?.trim();
      const normalize = s => s.replace(/^0\.\s*/, "").toLowerCase();

      // Ignorar archivos índice y 0.*
      if (normalize(filename) === normalize(parent)) return false;
      if (filename.startsWith("0.")) return false;

      // Ignorar archivos vacíos o muy cortos
      if (!note.content || note.content.trim().length < 10) return false;

      return true;
    });

    console.log(`🧹 Después del filtrado quedan ${data.length} notas válidas.`);

    // === ORDENACIÓN ===
    data.forEach(n => (n._modified = new Date(n.modified)));
    const sorted = [...data].sort((a, b) => {
      const diff = b._modified - a._modified;
      if (diff !== 0) return diff;
      return b.src.split("/").length - a.src.split("/").length;
    });

    const latestNotes = sorted.slice(0, 5);
    console.table(
      latestNotes.map(n => ({
        Título: n.title,
        Fecha: n.modified,
        Ruta: n.src
      }))
    );

    // === CONSTRUIR HTML ===
    const container = document.getElementById("latest-posts");
    if (!container) {
      console.error("❌ No se encontró el contenedor #latest-posts");
      return;
    }
    container.innerHTML = "";

    if (latestNotes.length === 0) {
      container.innerHTML = "<li>No hay notas recientes.</li>";
      console.warn("⚠️ No hay notas válidas para mostrar.");
      console.groupEnd();
      return;
    }

    latestNotes.forEach(note => {
      const li = document.createElement("li");
      li.classList.add("latest-note");

      // === Corregir ruta ===
      // Si la ruta contiene "/ciberseguridad/", cámbiala a "/Ciberseguridad/"
      let correctedSrc = note.src.replace("/ciberseguridad/", "/Ciberseguridad/");

      // Generar URL codificada correctamente
      const viewerUrl = `markdown-viewer.html?file=${encodeURIComponent(correctedSrc)}`;

      // --- título ---
      const a = document.createElement("a");
      a.classList.add("latest-note-title");
      a.href = viewerUrl;
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

      // --- preview limpio ---
      let previewText = note.content
        .replace(/[#>*_`[\]]/g, "")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .split(/\s+/)
        .slice(0, 25)
        .join(" ")
        .trim();
      if (previewText.length > 0) previewText += "…";

      const preview = document.createElement("p");
      preview.classList.add("latest-note-preview");
      preview.textContent = previewText;

      // --- componer ---
      li.appendChild(a);
      li.appendChild(time);
      li.appendChild(preview);
      container.appendChild(li);
    });

    console.log(`🟢 Mostradas ${latestNotes.length} notas reales en la página.`);
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

