let allFiles = [];

fetch("/midi/data/midis.json")
  .then(res => res.json())
  .then(data => {
    allFiles = data;
    sortFiles("newest");
  });

const list = document.getElementById("midi-list");
const search = document.getElementById("search");

// Sorting function
function sortFiles(type) {
  const files = [...allFiles];

  switch (type) {
    case "newest":
      files.sort((a, b) => new Date(b.id) - new Date(a.id));
      break;
    case "title":
      files.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      break;
    case "artist":
      files.sort((a, b) => (a.artist || "").localeCompare(b.artist || ""));
      break;
  }

  renderList(files);
}

// Render function
function renderList(files) {
  list.innerHTML = "";

  files.forEach(file => {
    const item = document.createElement("a");
    item.className = "midi-item card";
    item.href = `/midi/file/?id=${file.id}`;

    const imageSrc = file.image
      ? `/midi/assets/images/${file.image}`
      : `/midi/assets/images/placeholder.png`;

    item.innerHTML = `
      <img
        src="${imageSrc}"
        alt="Artwork for ${file.title}"
        onerror="this.src='/midi/assets/images/placeholder.png'">
      <div>
        <strong>${file.title}</strong><br>
        ${file.artist || ""}<br>
        <small>${file.date_created}</small>
      </div>
    `;

    list.appendChild(item);
  });
}

// Search input
search.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = allFiles.filter(f =>
    (f.title || "").toLowerCase().includes(q) ||
    (f.artist || "").toLowerCase().includes(q)
  );
  renderList(filtered);
});

// Filter buttons
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    sortFiles(btn.dataset.sort);
  });
});
