const BASE_URL = "http://localhost:8080";

// get list of notes for library list
const results = await fetch(BASE_URL + "/notes")
  .then((data) => data.json())
  .then((data) => data);

// add note titles to library list for display
const libraryUL = document.getElementById("listOfNotes");
results.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.title}`;
  libraryUL.appendChild(li);
});

// add eventlistener to ul for a click on note title
libraryUL.addEventListener("click", function (event) {
  console.log(event.target.innerHTML);
  results.forEach((item) => {
    if (event.target.innerHTML == item.title) {
      console.log(item.id);
      document.getElementById("note-title").value = `${item.title}`;
      document.getElementById("note-body").value = `${item.body}`;
      document.getElementById("submit-button").innerHTML = "Save"; // indicate to save changes
      document.getElementById("submit-button").value = `${item.id}`; // save the id of note in button value
    }
  });
});

// add eventlistener to newNote button to reset text fields
const newNoteButton = document.getElementById("newNote");
newNoteButton.addEventListener("click", function (event) {
  document.getElementById("note-title").value = null;
  document.getElementById("note-body").value = null;
  document.getElementById("submit-button").innerHTML = "Submit";
  document.getElementById("submit-button").value = "0";
});

// submit button handler
document.getElementById("note-form").onsubmit = function submitHandler(event) {
  const formData = new FormData(event.target);
  const noteTitle = formData.get("note-title");
  const noteBody = formData.get("note-body");
  var noteID = document.getElementById("submit-button").value;

  if (noteID == 0) {
    // Post new note
    noteID = results.length + 1;
    createNote(noteID, noteTitle, noteBody);
  } else {
    // make the note to edit
    const newNote = { noteID, noteTitle, noteBody };
    editNote(noteID, noteTitle, noteBody);
  }
  document.getElementById("submit-button").innerHTML = "Submit";
  document.getElementById("submit-button").value = "0";
};

// POST NEW NOTE
async function createNote(id, title, body) {
  // make the new note
  const noteID = id.toString();
  const newNote = { noteID, title, body };
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
