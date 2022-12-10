import {
  notesArray,
  titleInput,
  noteInput,
  noteContainer,
  form,
  modalContainer,
} from "./global.js";

noteInput;
titleInput;
form;
noteContainer;
notesArray;
modalContainer;

//* Function: view note in modal *//
function activeNoteModal(title, body) {
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalContainer.classList.add("active");
}

//*Event: modal close  button *//

const modalBtn = document
  .querySelector(".modal-btn")
  .addEventListener("click", () => {
    modalContainer.classList.remove("active");
  });

//* Function: Show alert messages *// Working 100%

function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement("beforebegin", alertDiv);
  titleInput.focus();
  setTimeout(() => alertDiv.remove(), 2000);
}

export { activeNoteModal, showAlertMessage, modalBtn };
