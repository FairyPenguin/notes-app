parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xFa0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.titleInput=exports.noteInput=exports.noteContainer=exports.modalContainer=exports.form=void 0;var e=document.querySelector(".note-container");exports.noteContainer=e;var t=document.querySelector(".modal-container");exports.modalContainer=t;var o=document.querySelector("form");exports.form=o;var r=document.querySelector("#title");exports.titleInput=r;var n=document.querySelector("#note");exports.noteInput=n;
},{}],"aSkv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.activeNoteModal=t,exports.modalBtn=void 0,exports.showAlertMessage=n;var e=require("./global.js");function t(t,o){var n=document.querySelector(".modal-title"),r=document.querySelector(".modal-body");n.textContent=t,r.textContent=o,e.modalContainer.classList.add("active")}e.noteInput,e.titleInput,e.form,e.noteContainer,e.notesArray,e.modalContainer;var o=document.querySelector(".modal-btn").addEventListener("click",function(){e.modalContainer.classList.remove("active")});function n(t,o){var n=document.createElement("div");n.className="message ".concat(o),n.appendChild(document.createTextNode(t)),e.form.insertAdjacentElement("beforebegin",n),e.titleInput.focus(),setTimeout(function(){return n.remove()},2e3)}exports.modalBtn=o;
},{"./global.js":"xFa0"}],"A2T1":[function(require,module,exports) {
"use strict";var e=require("./modal-alert"),t=require("./global.js");t.modalContainer,t.noteInput,t.titleInput,t.form,t.noteContainer;var n=[];function o(e,t){console.log("addNotesToArray");var o={id:Math.random(),title:e,body:t};n.push(o),a(n),l(n),console.log(n)}function a(e){t.noteContainer.innerHTML="",e.forEach(function(e){var n=document.createElement("div");n.classList.add("note"),n.innerHTML="\n    <span hidden>".concat(e.id,'</span>\n    <h2 class="note-title">').concat(e.title,'</h2>\n    <p class="note-body">').concat(e.body,'</p>\n    <div class="note-btns">\n      <button class="note-btn view-btn">View Detail</button>\n      <button class="note-btn delete-btn">Delete Note</button>\n    </div>\n  '),t.noteContainer.appendChild(n),console.log(n)})}function l(e){window.localStorage.setItem("notes",JSON.stringify(e))}function s(){var e=window.localStorage.getItem("notes");if(e){var t=JSON.parse(e);a(n),console.log(t)}}function r(e){l(n=n.filter(function(t){return t.id!=e}))}localStorage.getItem("notes")&&(n=JSON.parse(localStorage.getItem("notes"))),s(),t.form.addEventListener("submit",function(n){n.preventDefault();var a=document.querySelector("#note");t.titleInput.value.length>0&&a.value.length>0?(o(t.titleInput.value,a.value),t.titleInput.value="",a.value="",(0,e.showAlertMessage)("Note successfully added","success-message"),t.titleInput.focus()):(0,e.showAlertMessage)("Please add both a title and a note","alert-message")}),e.activeNoteModal,e.modalBtn,t.noteContainer.addEventListener("click",function(t){if(t.target.classList.contains("view-btn")){var n=t.target.closest(".note"),o=n.querySelector(".note-title").textContent,a=n.querySelector(".note-body").textContent;(0,e.activeNoteModal)(o,a)}if(t.target.classList.contains("delete-btn")){var l=t.target.closest(".note");(0,e.showAlertMessage)("Your note was permanently deleted","remove-message"),l.remove();var s=l.querySelector("span").textContent;r(Number(s))}});
},{"./modal-alert":"aSkv","./global.js":"xFa0"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.5941a19a.js.map