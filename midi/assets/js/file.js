const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("/midi/data/midis.json")
  .then(res => res.json())
  .then(data => {
    const file = data.find(f => f.id == id);
    if (!file) return;

    // If file.image exists, prepend folder. Otherwise use placeholder
    const imageSrc = file.image 
      ? `/midi/assets/images/${file.image}` 
      : "/midi/assets/images/placeholder.png";

    document.title = `${file.title} by ${file.artist} — Vertz1515 MIDI Files`;

    // Open Graph / Discord embed metadata
    const ogTags = {
      "og:title":       `${file.title} — Vertz1515 MIDI Files`,
      "og:description": file.description || `Arranged by ${file.arranger}`,
      "og:image":       `https://vertz1515.com${imageSrc}`,
      "og:url":         window.location.href,
      "og:type":        "music.song",
      "og:site_name":   "Vertz1515 MIDI Files",
      "twitter:card":   "summary"
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      const attr = property.startsWith("twitter:") ? "name" : "property";
      let tag = document.querySelector(`meta[${attr}="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    document.getElementById("midi-file").innerHTML = `
      <div class="file-card card">
        <div class="file-layout">
          <img src="${imageSrc}" alt="Artwork for ${file.title}" onerror="this.src='/midi/assets/images/placeholder.png'">

          <div>
            <h1>${file.title}</h1>
            <h2>${file.artist}</h2>

            <p><strong>Arranger:</strong> ${file.arranger}</p>
            <p><strong>Date:</strong> ${file.date_created}</p>

            <div class="card">
              <audio controls src="${file.preview_mp3}"></audio>
            </div>

            <p>${file.description}</p>

            <a class="download" download href="/midi/files/${file.filename}">
              Download MIDI
            </a>
          </div>
        </div>
      </div>
    `;
  });
