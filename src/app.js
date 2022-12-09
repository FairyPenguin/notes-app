// //* Global Query Selectors *//

const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form"); // Global Query Selectors
const titleInput = document.querySelector("#title");

//* Class: for generating a new note *//

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.random();
  }
}

// //* Local Storage functions *//

// //* function: retrive notes from local storage

// function getNotes() {
//   let notes;
//   if (localStorage.getItem("noteApp.notes") === null) {
//     notes = [];
//   } else {
//     notes = JSON.parse(localStorage.getItem("noteApp.notes"));
//   }
//   return notes;
// }

// //* function: add a note to local storage

// function addNotesToLocalStorage(note) {
//   const notes = getNotes();
//   notes.push(note);
//   localStorage.setItem("noteApp.notes", JSON.stringify(notes));
// }

// //* function: remove a note from local storage

// function removeNote(id) {
//   const notes = getNotes();
//   notes.forEach((note, index) => {
//     if (note.id === id) {
//       notes.splice(index, 1);
//     }
//     localStorage.setItem("noteApp.notes", JSON.stringify(notes));
//   });
// }
//Function: create new note in the ui

function addNewNoteToList(note) {
  const newUINote = document.createElement("div");
  newUINote.classList.add("note");
  newUINote.innerHTML = `
    <span hidden>${note.id}</span>
    <h2 class="note-title">${note.title}</h2>
    <p class="note-body">${note.body}</p>
    <div class="note-btns">
      <button class="note-btn view-btn">View Detail</button>
      <button class="note-btn delete-btn">Delete Note</button>
    </div>
  `;

  noteContainer.appendChild(newUINote);
}

// function: show notes in the ui //

// function displayNotes() {
//   const notes = getNotes();
//   notes.forEach((note) => {
//     addNewNoteToList(note);
//   });
// }

//* Function: Show alert messages *//

function showAlertMessages(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  titleInput.focus();
  setTimeout(() => alertDiv.remove(), 2000);
}

//* Function: view note in modal *//
function activeNoteModal(title, body) {
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalContainer.classList.add("active");
}

//*Event: close modal button *//

const modalButton = document
  .querySelector(".modal-btn")
  .addEventListener("click", () => {
    modalContainer.classList.remove("active");
  });

//* Event: Note Buttons *//
noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-btn")) {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note-title").textContent;
    const currentBody = currentNote.querySelector(".note-body").textContent;
    activeNoteModal(currentTitle, currentBody);
  }
  // Delete note //
  if (e.target.classList.contains("delete-btn")) {
    const currentNote = e.target.closest(".note");
    showAlertMessages("Your note deleted", "remove-message");
    currentNote.remove();
    const id = currentNote.querySelector("span").textContent;
    // removeNote(Number(id));
  }
});

// //* Event: Display notes eventlistner
// document.addEventListener("DOMContentLoaded", displayNotes);

//* Event: note form submit *//
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const noteBodyInput = document.querySelector("#note");

  //* form inputs validation *//
  if (titleInput.value.length > 0 && noteBodyInput.value.length > 0) {
    const createNewNote = new Note(titleInput.value, noteBodyInput.value);
    //Add new note to the ui//
    addNewNoteToList(createNewNote);
    // addNotesToLocalStorage(createNewNote);
    titleInput.value = "";
    noteBodyInput.value = "";
    showAlertMessages("Note Successfully added!", "success-message");
    titleInput.focus();
  } else {
    showAlertMessages("Please add both a title and a note", "alert-message");
  }
});
