// import fetch from "node-fetch";

const results = await fetch("http://localhost:8080/notes")
  .then((data) => data.json())
  .then((data) => data);

// async function getNotes() {
//   const test = document.getElementById("test");
//   for (const result of results) {
//     test.innerHTML = result.title + ": " + result.body;
//   }
// }

async function getNote(id) {
  // for (let i = 0; i < results.length; i++) {
  //   if (results[i].id == id) {
  //     document.getElementById("test").innerHTML =
  //       results[i].title + ": " + results[i].body;
  //   }
  // }

  const resultNote = await fetch("http://localhost:8080/notes/" + id)
    .then((data) => data.json())
    .then((data) => data);
  document.getElementById("test").innerHTML =
    resultNote.title + ": " + resultNote.body;
}

document.getElementById("getNote").addEventListener("click", () => {
  getNote(1);
});

// getNotes();
