import React from "react";
import { NoteContext } from "../../NoteContext";
import { Link } from "react-router-dom";

const Notes = () => {
  const { noteContainer, setNoteContainer } = React.useContext(NoteContext);
  
  const deleteNote = (idToDelete) => {
  const updatedNotes = noteContainer.filter(note => note.id !== idToDelete);
  setNoteContainer(updatedNotes);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};


  const noteContainer_els =
    noteContainer && noteContainer.length > 0 ? (
      <>
        {noteContainer.map((note, idx) => (
          <div key={idx} className="notes-page-note-con">
            <h3 className="notes-page-note-h">{note.note_title}</h3>
            <p className="notes-page-note-p">{note.note}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <Link to={`${note.id}`}>View</Link>
            <div className="notes-page-note-date-time-con">
              <span>{note.date}</span>
              <span>{note.time}</span>
            </div>
          </div>
        ))}
      </>
    ) : null;

  return (
    <div className="notes-main">
      {noteContainer && noteContainer.length > 0 ? (
        <h1>Your Notes</h1>
      ) : (
        <h1>No notes yet.</h1>
      )}
      <div className="note_container_element_con">{noteContainer_els}</div>
    </div>
  );
};

export default Notes;
