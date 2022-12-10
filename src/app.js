//* Imports *//
import { showAlertMessage, activeNoteModal, modalBtn } from "./modal-alert";
import {
  titleInput,
  noteInput,
  noteContainer,
  modalContainer,
  form,
} from "./global.js";

modalContainer;
noteInput;
titleInput;
form;
noteContainer;

// -------------- Main Array----------------

let notesArray = []; //! Array

/*------ Check the localstorage for data and
 prevent empty array and by update the array with the localstorage data
------*/

//! check the localstorage

if (localStorage.getItem("notes")) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
}

//------ Triger the [getNotesFromLocalStorage] function------//

getNotesFromLocalStorage(); //! get from localstorage

//-----------------Form:prevent defualt && Validation---------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteInput = document.querySelector("#note");

  // validate inputs
  if (titleInput.value.length > 0 && noteInput.value.length > 0) {
    addNotesToArray(titleInput.value, noteInput.value); //!Array Function
    titleInput.value = "";
    noteInput.value = "";
    showAlertMessage("Note successfully added", "success-message");
    titleInput.focus();
  } else {
    showAlertMessage("Please add both a title and a note", "alert-message");
  }
});

//-------------Add Note to the main array function------------------//

function addNotesToArray(titleInput, noteInput) {
  console.log("addNotesToArray");
  const note = {
    id: Math.random(),
    title: titleInput,
    body: noteInput,
  };

  //push notes(from user input) to the array
  notesArray.push(note);

  //add notes to the ui
  addNotesToUI(notesArray);

  // add notes to the local storage
  addNoteToLocalStorage(notesArray);

  console.log(notesArray);
}

//------------------Notes to UI function------------//
/* 
add notes to the ui function && 
prevent the notes from duplicate by empty the notes div
*/

function addNotesToUI(notesArray) {
  //empty the notes div
  noteContainer.innerHTML = "";
  notesArray.forEach((note) => {
    let newUINote = document.createElement("div");
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
    console.log(newUINote);
  });
}

/*
--- Modal Function &&
 Modal Close Button-->imported from modal-alert.js---
*/

activeNoteModal; //Modal Function
modalBtn; //Modal Close Button

//-----------Buttons: View && Delete ----------//

// Event: Note Buttons
noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-btn")) {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note-title").textContent;
    const currentBody = currentNote.querySelector(".note-body").textContent;
    activeNoteModal(currentTitle, currentBody);
  }
  //Delete Button [Deletes note from the UI]
  if (e.target.classList.contains("delete-btn")) {
    const currentNote = e.target.closest(".note");
    showAlertMessage("Your note was permanently deleted", "remove-message");
    currentNote.remove();
    const id = currentNote.querySelector("span").textContent;
    removeNote(Number(id));
  }
});

//------------Local Storage ------------------//

/*
Add - remove - check - retrive

*/

//---------------Add data ----------//
//! add to local storage
function addNoteToLocalStorage(notesArray) {
  window.localStorage.setItem("notes", JSON.stringify(notesArray));
}

//---------Get data--------//

// //! get from local storage
function getNotesFromLocalStorage() {
  let localNotes = window.localStorage.getItem("notes");
  if (localNotes) {
    let notes = JSON.parse(localNotes);
    addNotesToUI(notesArray);
    console.log(notes);
  }
}

// remove data fro local storage function //

function removeNote(id) {
  //*this block of code is for guidance only
  // for (let i = 0; i < notesArray.length; i++) {
  //   console.log(`${notesArray[i].id}===${id}`);
  // }
  //! Active Code
  notesArray = notesArray.filter((note) => note.id != id);
  addNoteToLocalStorage(notesArray);
}
