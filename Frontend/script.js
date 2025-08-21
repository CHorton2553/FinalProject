const BASE_URL = "http://localhost:8080";
var selectedNote = { id: "0", title: "", body: "" };

// get list of notes for library list
const results = await fetch(BASE_URL + "/notes")
  .then((data) => data.json())
  .then((data) => data);

// add note titles to library list for display
const libraryUL = document.getElementById("listOfNotes");
results.forEach((item) => {
  var li = document.createElement("li");
  li.id = `${item.id}`;
  li.textContent = `${item.title}`;
  libraryUL.appendChild(li);
});
console.log("Notes from api:", results);
console.log("Selected note at top:", selectedNote);

// reset selectedNote
function resetSelectedNote() {
  selectedNote.id = "0";
  selectedNote.title = "";
  selectedNote.body = "";
}

// add eventlistener to ul for a click on note title
libraryUL.addEventListener("click", function (event) {
  results.forEach((item) => {
    if (event.target.id == item.id) {
      // make and print to console this item
      const id = item.id;
      const title = item.title;
      const body = item.body;
      selectedNote = { id, title, body };
      console.log("Selected note:", selectedNote);

      // set the textareas to note values for display
      document.getElementById("note-title").value = `${title}`;
      document.getElementById("note-body").value = `${body}`;
      document.getElementById("submit-button").innerHTML = "Save";
    }
  });
});

// add eventlistener to resetNote button to reset text fields
const resetNoteButton = document.getElementById("resetNote");
resetNoteButton.addEventListener("click", function (event) {
  // reset textareas to null
  document.getElementById("note-title").value = null;
  document.getElementById("note-body").value = null;

  // reset the selected note
  resetSelectedNote();
  document.getElementById("submit-button").innerHTML = "Submit";
  console.log("Reset selected note:", selectedNote);
});

// submit button handler
document.getElementById("note-form").onsubmit = function submitHandler(event) {
  const formData = new FormData(event.target);
  const noteTitle = formData.get("note-title");
  const noteBody = formData.get("note-body");

  if (selectedNote.id == 0) {
    // Post new note
    let noteID = results.length + 1;
    createNote(noteID, noteTitle, noteBody);
  } else {
    // Edit selected note
    let noteID = selectedNote.id;
    editNote(noteID, noteTitle, noteBody);
  }
  document.getElementById("submit-button").innerHTML = "Submit";
};

// POST NEW NOTE
async function createNote(idPass, title, body) {
  // make the new note
  const id = idPass.toString();
  const newNote = { id, title, body };
  console.log("New Note:", newNote);

  // Send post request with newNote
  const result = await fetch(BASE_URL + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  })
    .then((data) => data.json())
    .then((data) => data);
  console.log("Create Note is complete");
  console.log(result);
}

// PATCH EDIT NOTE
async function editNote(id, title, body) {
  // reset
  // create the modified note
  const noteID = id.toString();
  const modifiedNote = { noteID, title, body };
  console.log("Modified Note:", modifiedNote);

  // send patch request with modifiedNote
  const result = await fetch(BASE_URL + "/notes/" + noteID, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedNote),
  })
    .then((data) => data.json())
    .then((data) => data);
}

/*
const results = await fetch(BASE_URL + "/notes")
  .then((data) => data.json())
  .then((data) => data);
*/
// async function getNote(title) {
//   const resultNote = await fetch("http://localhost:8080/notes/" + id)
//     .then((data) => data.json())
//     .then((data) => data);
//   document.getElementById("test").innerHTML =
//     resultNote.title + ": " + resultNote.body;
// }
