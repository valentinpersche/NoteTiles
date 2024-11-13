function renderTemplate(i, title, note) {
  return /*html*/ ` 
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

function deletedNotesTemplate(title, note, i) {
  return /*html*/ ` 
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
