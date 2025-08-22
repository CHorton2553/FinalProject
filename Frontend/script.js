const BASE_URL = "http://localhost:8080";
var selectedNote = { id: "0", title: "", body: "" };

// GET REQUEST
const results = await fetch(BASE_URL + "/notes")
  .then((data) => data.json())
  .then((data) => data);

// DISPLAY NOTES
const libraryUL = document.getElementById("listOfNotes");
results.forEach((item) => {
  var li = document.createElement("li");
  li.id = `${item.id}`;
  li.textContent = `${item.title}`;
  libraryUL.appendChild(li);
});
console.log("Notes from api:", results);
console.log("Selected note at top:", selectedNote);

// UPDATE DISPLAYED LIBRARY
function updateLibrary() {}

// RESET NOTE
function resetSelectedNote() {
  selectedNote.id = "0";
  selectedNote.title = "";
  selectedNote.body = "";
}

// UL EVENT LISTENER
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

// SUBMIT BUTTON HANDLER
document.getElementById("note-form").onsubmit = function submitHandler(event) {
  const formData = new FormData(event.target);
  const noteTitle = formData.get("note-title");
  const noteBody = formData.get("note-body");

  if (selectedNote.id == 0) {
    // Post new note
    console.log("Selected Note id:", selectedNote.id);
    createNote(noteTitle, noteBody);
  } else {
    // Edit selected note
    let noteID = selectedNote.id;
    editNote(noteID, noteTitle, noteBody);
  }
  document.getElementById("submit-button").innerHTML = "Submit";
};

// RESET NOTE TEXTAREAS
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

// GET NEW ID
function getNewId() {
  var maxID = 0;
  results.forEach((item) => {
    var id = Number(item.id);
    if (id >= maxID) {
      maxID = item.id;
    }
  });
  maxID++;
  console.log("New ID:", maxID);
  return maxID;
}

// POST REQUEST
async function createNote(title, body) {
  // make the new note
  const id = getNewId().toString();
  const newNote = { id, title, body };
  console.log("New Note:", newNote);
  try {
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
  } catch (error) {
    console.error(error.message);
  }
}

// PATCH REQUEST
async function editNote(idPass, title, body) {
  // create the modified note
  const id = idPass.toString();
  const modifiedNote = { id, title, body };
  console.log("Modified Note:", modifiedNote);

  // send patch request with modifiedNote
  const result = await fetch(BASE_URL + "/notes/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedNote),
  })
    .then((data) => data.json())
    .then((data) => data);
  console.log(result);
}

// DELETE NOTE LISTENER
const deleteNoteButton = document.getElementById("deleteNote");
deleteNoteButton.addEventListener("click", function () {
  if (selectedNote.id == 0) {
    return;
  } else {
    deleteNote();
  }
});

// DELETE REQUEST
async function deleteNote() {
  // make the note to delete
  const deletedNote = {
    id: selectedNote.id,
    title: selectedNote.title,
    body: selectedNote.body,
  };

  // send delete with note to delete
  const result = await fetch(BASE_URL + "/notes/" + selectedNote.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deletedNote),
  })
    .then((data) => data.json())
    .then((data) => data);

  window.location.reload();
}
