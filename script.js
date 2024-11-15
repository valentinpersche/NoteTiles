// All Notes Object
let allNotes = {
  titles: [],
  notes: [],
  trashTitles: [],
  trashNotes: [],
};

// Load Notes from Local Storage
load();
loadTrashNotes();

// Render Notes
function render() {
  let content = document.getElementById("noteContainer");
  content.innerHTML = "";

  for (let i = 0; i < allNotes.notes.length; i++) {
    const title = allNotes.titles[i];
    const note = allNotes.notes[i];

    content.innerHTML += renderTemplate(i, title, note);
  }
}
// Render Trash Notes
function renderTrashNotes() {
  let content = document.getElementById("deletedNotesContainer");
  content.innerHTML = "";

  for (let i = 0; i < allNotes.trashNotes.length; i++) {
    const title = allNotes.trashTitles[i];
    const note = allNotes.trashNotes[i];

    content.innerHTML += deletedNotesTemplate(title, note, i);
  }
}

// Add new Note
function addNote() {
  let noteTitle = document.getElementById("titleInput");
  let noteText = document.getElementById("noteInput");

  allNotes.titles.push(noteTitle.value);
  allNotes.notes.push(noteText.value);

  document.getElementById("titleInput").value = "";
  document.getElementById("noteInput").value = "";

  autoGrow(noteText);
  render();
  save();
}

// Transfer Notes to Trash Notes
function deleteNote(i) {
  allNotes.trashTitles.push(allNotes.titles.splice(i, 1));
  allNotes.trashNotes.push(allNotes.notes.splice(i, 1));

  save();
  render();
}

// Transfer Trash Notes to Notes
function restoreNote(i) {
  allNotes.titles.push(allNotes.trashTitles.splice(i, 1));
  allNotes.notes.push(allNotes.trashNotes.splice(i, 1));

  save();
  renderTrashNotes();
}

// Delete Note permanently
function deleteNotePermanent(i) {
  allNotes.trashTitles.splice(i, 1);
  allNotes.trashNotes.splice(i, 1);

  save();
  renderTrashNotes();
}

// Save Notes and Trash Notes to Local Storage
function save() {
  let titlesAsText = JSON.stringify(allNotes.titles);
  localStorage.setItem("titles", titlesAsText);

  let notesAsText = JSON.stringify(allNotes.notes);
  localStorage.setItem("notes", notesAsText);

  let deletedTitlesAsText = JSON.stringify(allNotes.trashTitles);
  localStorage.setItem("deletedTitles", deletedTitlesAsText);

  let deletedNotesAsText = JSON.stringify(allNotes.trashNotes);
  localStorage.setItem("deletedNotes", deletedNotesAsText);
}

// Load Notes from Local Storage
function load() {
  let titlesAsText = localStorage.getItem("titles");
  let notesAsText = localStorage.getItem("notes");

  if (titlesAsText && notesAsText) {
    allNotes.titles = JSON.parse(titlesAsText);
    allNotes.notes = JSON.parse(notesAsText);
  }
}

// Load Trash notes from Local Storage
function loadTrashNotes() {
  let deletedTitlesAsText = localStorage.getItem("deletedTitles");
  let deletedNotesAsText = localStorage.getItem("deletedNotes");

  if (deletedTitlesAsText && deletedNotesAsText) {
    allNotes.trashTitles = JSON.parse(deletedTitlesAsText);
    allNotes.trashNotes = JSON.parse(deletedNotesAsText);
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
