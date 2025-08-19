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
  results.forEach((item) => {
    if (event.target.innerHTML == item.title) {
      document.getElementById("note-title").value = `${item.title}`;
      document.getElementById("note-body").value = `${item.body}`;
      document.getElementById("submit-button").innerHTML = "Save"; // indicate to save changes
      document.getElementById("submit-button").value = `${item.id}`; // save the id of note in button value
    }
  });
});

// submit button handler
function submitHandler(event) {
  // if (event.target.value === "0") {
  //   document.getElementById("help").innerHTML = "here";
  // }
  console.log("here here");
  return true;
}

// document.getElementById("note-form").onsubmit = function () {
//   submitHandler(event);
// };

// function displayNote(title) {
//   let noteStr = "";
//   results.forEach((item) => {
//     if (item.title == title) {
//       noteStr = `${item.title}: ${item.body}`;
//       console.log(noteStr);
//       return noteStr;
//     }
//   });
// }

// async function getNote(title) {
//   const resultNote = await fetch("http://localhost:8080/notes/" + id)
//     .then((data) => data.json())
//     .then((data) => data);
//   document.getElementById("test").innerHTML =
//     resultNote.title + ": " + resultNote.body;
// }
