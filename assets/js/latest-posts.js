// assets/js/latest-posts.js
(async function () {
  console.group("🧠 Últimos apuntes – versión limpia (mtime real)");

  try {
    console.log("📡 Cargando apuntes/index_full.json...");
    const res = await fetch("apuntes/index_full.json");
    if (!res.ok) throw new Error(`No se pudo cargar index_full.json (${res.status})`);

    let data = await res.json();
    console.log(`✅ Cargado: ${data.length} apuntes totales`);

    // === 1. FILTRADO ===
    data = data.filter(note => {
      const src = note.src.toLowerCase();

      if (src.includes("/z imagenes/")) return false;
      if (src.includes(".obsidian")) return false;

      const parts = note.src.split("/");
      const filename = parts.at(-1).replace(".md", "").trim();
      const parent = parts.at(-2)?.trim();
      const normalize = s => s.replace(/^0\.\s*/, "").toLowerCase();

      if (normalize(filename) === normalize(parent)) return false;
      if (filename.startsWith("0.")) return false;

      if (!note.content || note.content.trim().length < 10) return false;

      return true;
    });

    console.log(`🧹 Tras filtrado: ${data.length} apuntes válidos`);

    // === 2. ORDENAR POR FECHA (más nuevos arriba) ===
    data.forEach(n => (n._modified = new Date(n.modified)));

    const sorted = [...data].sort((a, b) => b._modified - a._modified);

    const latestNotes = sorted.slice(0, 5);

    console.table(
      latestNotes.map(n => ({
        "📝 Título": n.title,
        "⏱ Fecha": n.modified,
        "📄 Ruta": n.src,
      }))
    );

    // === 3. PINTAR HTML ===
    const container = document.getElementById("latest-posts");
    if (!container) {
      console.error("❌ No existe #latest-posts en index.html");
      return;
    }

    container.innerHTML = "";

    if (latestNotes.length === 0) {
      container.innerHTML = "<li>No hay notas recientes.</li>";
      return;
    }

    latestNotes.forEach(note => {
      const li = document.createElement("li");
      li.classList.add("latest-note");

      const correctedSrc = note.src.replace("/ciberseguridad/", "/Ciberseguridad/");
      const viewerUrl = `markdown-viewer.html?file=${encodeURIComponent(correctedSrc)}`;

      // título
      const a = document.createElement("a");
      a.classList.add("latest-note-title");
      a.href = viewerUrl;
      a.textContent = note.title;

      // fecha
      const t = document.createElement("span");
      t.classList.add("latest-note-date");
      t.textContent = new Date(note.modified).toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // preview
      const preview = document.createElement("p");
      preview.classList.add("latest-note-preview");
      let clean = note.content
        .replace(/[#>*_`[\]]/g, "")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .split(/\s+/)
        .slice(0, 25)
        .join(" ")
        .trim();
      if (clean.length > 0) clean += "…";
      preview.textContent = clean;

      li.appendChild(a);
      li.appendChild(t);
      li.appendChild(preview);
      container.appendChild(li);
    });

    console.log("🟢 Últimos apuntes generados correctamente.");
  } catch (err) {
    console.error("💥 Error:", err);
    const c = document.getElementById("latest-posts");
    if (c) c.innerHTML = "<li>Error cargando apuntes recientes.</li>";
  } finally {
    console.groupEnd();
  }
})();

