//* Global Query Selectors *//

const noteContainer = document.querySelector(".note-container");
const modalContainer = document.querySelector(".modal-container");
const form = document.querySelector("form"); // Global Query Selectors
const titleInput = document.querySelector("#title");
const noteBodyInput = document.querySelector("#note");
let notesArray = []; //! Arrrrrrrrray

if (localStorage.getItem("notes")) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
}

//! Trigger the getNotesFromLocalStorage function
getNotesFromLocalStorage();

//* Class: for generating a new note

class Note {
  constructor(title, body) {
    this.title = title;
    this.body = body;
    this.id = Math.random();
  }
}
/* 
*we push the para to the array which 
!is now coming from the ("form inputs validation")
*as an argument, and reuse it agian in the array
! now we have the problem of render the elements
*/

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

function newNoteFunction() {
  if (titleInput.value.length > 0 && noteBodyInput.value.length > 0) {
    const NewNote = new Note(titleInput.value, noteBodyInput.value);

    addtoArray(NewNote);

    titleInput.value = "";
    noteBodyInput.value = "";
    // addNewNoteToList(NewNote);
    showAlertMessages("Note Successfully added!", "success-message");
    titleInput.focus();
  } else {
    showAlertMessages("Please add both a title and a note", "alert-message");
  }
}

//* Notes Array function !
function addtoArray(NewNote) {
  //! Array !//
  notesArray.push(NewNote);
  addNewNoteToList(notesArray);
  addNoteToLocalStorage(notesArray);
  console.log(notesArray);
  console.log(JSON.stringify(notesArray));
  console.log(NewNote);
}

function addNewNoteToList() {
  notesArray.forEach((note) => {
    // note is the parameter used in
    //  ${note.id}$, {note.title}$ and {note.body}

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
  });
}

//* form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //* form inputs newNoteFunction *//
  newNoteFunction();
});

//! get from local storage
function addNoteToLocalStorage(notesArray) {
  window.localStorage.setItem("notes", JSON.stringify(notesArray));
}

//! get from local storage
function getNotesFromLocalStorage() {
  let localNotes = window.localStorage.getItem("notes");
  if (localNotes) {
    let notes = JSON.parse(localNotes);
    console.log(notes);
    addNewNoteToList();
  }
}
