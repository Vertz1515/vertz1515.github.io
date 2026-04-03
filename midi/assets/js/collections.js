Promise.all([
  fetch("/midi/data/collections.json").then(r => r.json()),
  fetch("/midi/data/midis.json").then(r => r.json())
]).then(([collections, midis]) => {
  const container = document.getElementById("collections");

  collections.forEach(col => {
    const files = midis.filter(m => col.ids.includes(m.id));

    const div = document.createElement("div");
    div.className = "collection card";

    const imgHTML = col.image
      ? `<div class="collection-img-wrap"><img src="${col.image}" alt=""></div>`
      : `<div class="collection-img-wrap"></div>`;

    div.innerHTML = `
      ${imgHTML}
      <div class="collection-body">
        <h2>${col.title}</h2>
        <p>${col.description}</p>
        <ul>
          ${files.map(f =>
            `<li><a href="/midi/file/?id=${f.id}">${f.title}</a></li>`
          ).join("")}
        </ul>
      </div>
    `;

    container.appendChild(div);
  });
});
