fetch("../data/midis.json")
  .then(res => res.json())
  .then(data => initEditor(data));

const editor = document.getElementById("editor");
let midiData = [];

function initEditor(data) {
  midiData = data;

  data.forEach((file, index) => {
    const div = document.createElement("div");
    div.className = "entry";

    div.innerHTML = `
      <strong>ID ${file.id}</strong>

      <label>Title
        <input value="${file.title || ""}">
      </label>

      <label>Artist
        <input value="${file.artist || ""}">
      </label>

      <label>Arranger
        <input value="${file.arranger || ""}">
      </label>

      <label>Date
        <input value="${file.date_created || ""}">
      </label>

      <label>Image filename
        <input value="${file.image || ""}">
      </label>

      <label>Description
        <textarea rows="3">${file.description || ""}</textarea>
      </label>

      <label>Choose image file
        <input type="file" accept="image/*">
      </label>
    `;

    const inputs = div.querySelectorAll("input, textarea");

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        file.title = inputs[0].value || null;
        file.artist = inputs[1].value || null;
        file.arranger = inputs[2].value || null;
        file.date_created = inputs[3].value || null;
        file.image = inputs[4].value || null;
        file.description = inputs[5].value || "";
      });
    });

    const fileInput = div.querySelector('input[type="file"]');
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length) {
        file.image = fileInput.files[0].name;
        inputs[4].value = file.image;
      }
    });

    editor.appendChild(div);
  });
}

document.getElementById("export").addEventListener("click", () => {
  const blob = new Blob(
    [JSON.stringify(midiData, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "midis.json";
  a.click();
});
