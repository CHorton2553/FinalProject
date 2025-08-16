import fetch from "node-fetch";

async function getNotes() {
  const results = await fetch("http://localhost:8080/notes")
    .then((data) => data.json())
    .then((data) => data);

  for (const result of results) {
    console.log(result);
  }
}

getNotes();
