//=== Arrays der Hauptseite ===//
let titles = [];
let notes = [];

//=== Arrays der Trash-Seite ===//

let deletedTitles = [];
let deletedNotes = [];

//=== Notizen aus dem Local Storage laden ===//
load();
loadDeletedNotes();

//=== Notizen in den Container laden ===//
function render() {
  let content = document.getElementById("noteContainer");
  content.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const title = titles[i];
    const note = notes[i];

    content.innerHTML += /*html*/ ` 
    <div class="noteBox">
      <span class="noteTitle">${title}</span>
      <br />
      <span class="noteText">${note}</span>
      <br />
      <div class="imageContainer">
      <div class="tooltipContainer">
    <span class="tooltipTextDelete">Löschen</span>
    <img
      onclick="deleteNote(${i})"
      class="clearImage"
      src="./img/delete.png"
      alt="Löschen"
    />
      </div>
      </div>
    </div>`;
  }
}

//=== Notizen in den Gelöschte Notizen Container laden ===//
function renderDeletedNotes() {
  let content = document.getElementById("deletedNotesContainer");
  content.innerHTML = "";

  for (let i = 0; i < deletedNotes.length; i++) {
    const title = deletedTitles[i];
    const note = deletedNotes[i];

    content.innerHTML += /*html*/ ` 
    <div class="noteBox">
      <span class="noteTitle">${title}</span>
      <br />
      <span class="noteText">${note}</span>
      <br />
      <div class="imageContainer">
      <div class="tooltipContainer">
    <span class="tooltipTextRestore">Wiederherstellen</span>
        <img 
          onclick="restoreNote(${i})"
          class="restoreImage"
          src="./img/restore.png"
          alt="Wiederherstellen"
          />
      </div>
      <div class="tooltipContainer">
    <span class="tooltipTextDelete">Löschen</span>
        <img
          onclick="deleteNotePermanent(${i})"
          class="clearImage"
          src="./img/delete.png"
          alt="Löschen"
        />
      </div>
      </div>
    </div>`;
  }
}

//=== Neue Notiz hinzufügen ===//
function addNote() {
  let noteTitle = document.getElementById("titleInput");
  let noteText = document.getElementById("noteInput");

  if (noteTitle.value.length > 0 && noteText.value.length > 0) {
    titles.push(noteTitle.value);
    notes.push(noteText.value);

    document.getElementById("titleInput").value = "";
    document.getElementById("noteInput").value = "";

    autoGrow(noteText);
    render();
    save();
  } else {
    alert("Bitte Notiz Titel und Text eingeben");
  }
}

//=== Notiz löschen und in Trash Arrays übertragen ===//
function deleteNote(i) {
  deletedTitles.push(titles.splice(i, 1));
  deletedNotes.push(notes.splice(i, 1));

  save();
  render();
}

//=== Gelöschte Notiz wiederherstellen ===//
function restoreNote(i) {
  titles.push(deletedTitles.splice(i, 1));
  notes.push(deletedNotes.splice(i, 1));

  save();
  renderDeletedNotes();
}

//=== Notiz permanent löschen ===//
function deleteNotePermanent(i) {
  deletedTitles.splice(i, 1);
  deletedNotes.splice(i, 1);

  save();
  renderDeletedNotes();
}

//=== Notizen in Local Storage speichern ===//
function save() {
  let titlesAsText = JSON.stringify(titles);
  localStorage.setItem("titles", titlesAsText);

  let notesAsText = JSON.stringify(notes);
  localStorage.setItem("notes", notesAsText);

  let deletedTitlesAsText = JSON.stringify(deletedTitles);
  localStorage.setItem("deletedTitles", deletedTitlesAsText);

  let deletedNotesAsText = JSON.stringify(deletedNotes);
  localStorage.setItem("deletedNotes", deletedNotesAsText);
}

//=== Notizen aus Local Storage laden ===//
function load() {
  let titlesAsText = localStorage.getItem("titles");
  let notesAsText = localStorage.getItem("notes");

  if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
  }
}

//=== Glöschte Notizen aus Local Storage laden ===//
function loadDeletedNotes() {
  let deletedTitlesAsText = localStorage.getItem("deletedTitles");
  let deletedNotesAsText = localStorage.getItem("deletedNotes");

  if (deletedTitlesAsText && deletedNotesAsText) {
    deletedTitles = JSON.parse(deletedTitlesAsText);
    deletedNotes = JSON.parse(deletedNotesAsText);
  }
}

//=== Eingabefeld an Inhalt anpassen ===//
function autoGrow(element) {
  if (element.scrollHeight > 36) {
    element.style.height = 5 + "px";
    element.style.height = element.scrollHeight + 10 + "px";
  } else {
    element.style.height = "";
  }
}

//=== Menü Ein- und Ausblenden ===//
function toggleMenu() {
  let menu = document.getElementById("menu");
  if (menu.style.display === "none") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
}
