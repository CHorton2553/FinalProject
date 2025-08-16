"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then((data) => data.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  return (
    <div>
      <h2>Notes from API</h2>
      {notes.map((note) => (
        <div>
          <p>Title: {note.title}</p>
          <p>Body: {note.body}</p>
        </div>
      ))}
    </div>
  );
}
