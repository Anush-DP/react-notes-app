import { useEffect, useState } from "react";
import "./App.css";
import { InputBox } from "./components/input-box";
import { Note } from "./components/note";

function App() {
  const [notes, updateNotes] = useState([]);

  useEffect(() => {
    let notesStr = localStorage.getItem("notes");
    notesStr
      ? updateNotes(JSON.parse(notesStr))
      : localStorage.setItem("notes", JSON.stringify([]));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const deleteNote = (id) => {
    updateNotes((notes) => [...notes.slice(0, id), ...notes.slice(id + 1)]);
  };

  return (
    <div className="App">
      <button
        onClick={() =>
          window.location.assign("https://github.com/Anush-DP/react-notes-app")
        }
        className="source-code"
      >{`<Code />`}</button>
      <h1 className="heading">Simple Notes App</h1>
      <InputBox
        addNote={(note) => updateNotes((notes) => [...notes, { ...note }])}
      />
      <div className="notes-container">
        {notes.map((note, idx) => (
          <Note
            header={note.header}
            body={note.body}
            id={idx}
            removeNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
