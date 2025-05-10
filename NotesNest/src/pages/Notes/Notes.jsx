import React from "react";
import { NoteContext } from "../../NoteContext";
import { Link } from "react-router-dom";

const Notes = () => {
  const { noteContainer } = React.useContext(NoteContext);

  const noteContainer_els =
    noteContainer && noteContainer.length > 0 ? (
      <>
        {noteContainer.map((note, idx) => (
          <Link
              to= {`${note.id}`}
           key={idx} 
           className="notes-page-note-con">
            <h3 className="notes-page-note-h">{note.note_title}</h3>
            <p className="notes-page-note-p">{note.note}</p>
          </Link>
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
