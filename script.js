// Main Page Arrays
let titles = [];
let notes = [];

// Trash Page Arrays

let deletedTitles = [];
let deletedNotes = [];

// Load Notes from Local Storage
load();
loadDeletedNotes();

// Load Notes in Container
function render() {
  let content = document.getElementById("noteContainer");
  content.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const title = titles[i];
    const note = notes[i];

    content.innerHTML += renderTemplate(i, title, note);
  }
}

// Load Trash Notes in Trash Notes Container
function renderDeletedNotes() {
  let content = document.getElementById("deletedNotesContainer");
  content.innerHTML = "";

  for (let i = 0; i < deletedNotes.length; i++) {
    const title = deletedTitles[i];
    const note = deletedNotes[i];

    content.innerHTML += deletedNotesTemplate(title, note, i);
  }
}

// Add new Note
function addNote() {
  let noteTitle = document.getElementById("titleInput");
  let noteText = document.getElementById("noteInput");

  titles.push(noteTitle.value);
  notes.push(noteText.value);

  document.getElementById("titleInput").value = "";
  document.getElementById("noteInput").value = "";

  autoGrow(noteText);
  render();
  save();
}

// Delete Notes and transfer to Trash Array
function deleteNote(i) {
  deletedTitles.push(titles.splice(i, 1));
  deletedNotes.push(notes.splice(i, 1));

  save();
  render();
}

// Restore deleted Notes
function restoreNote(i) {
  titles.push(deletedTitles.splice(i, 1));
  notes.push(deletedNotes.splice(i, 1));

  save();
  renderDeletedNotes();
}

// Delete Note permanently
function deleteNotePermanent(i) {
  deletedTitles.splice(i, 1);
  deletedNotes.splice(i, 1);

  save();
  renderDeletedNotes();
}

// Save Notes to Local Storage
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

// Load Notes from Local Storage
function load() {
  let titlesAsText = localStorage.getItem("titles");
  let notesAsText = localStorage.getItem("notes");

  if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
  }
}

// Load Trash notes from Local Storage
function loadDeletedNotes() {
  let deletedTitlesAsText = localStorage.getItem("deletedTitles");
  let deletedNotesAsText = localStorage.getItem("deletedNotes");

  if (deletedTitlesAsText && deletedNotesAsText) {
    deletedTitles = JSON.parse(deletedTitlesAsText);
    deletedNotes = JSON.parse(deletedNotesAsText);
  }
}

// Make Input field growing with Text
function autoGrow(element) {
  if (element.scrollHeight > 36) {
    element.style.height = 5 + "px";
    element.style.height = element.scrollHeight + 10 + "px";
  } else {
    element.style.height = "";
  }
}

// Toggle Menu Bar
function toggleMenu() {
  let menu = document.getElementById("menu");
  if (menu.style.display === "none") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
}
