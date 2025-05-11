import React from "react";
import { NoteContext } from "../../NoteContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../../AuthContext";

const Notes = () => {
  const { noteContainer, setNoteContainer } = React.useContext(NoteContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Real-time Firestore sync for logged-in user, clear notes on logout
  React.useEffect(() => {
    if (!user) {
      setNoteContainer([]);
      return;
    }
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNoteContainer(
        querySnapshot.docs
          .map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
          .filter(
            (note) => typeof note.id === "string" && note.id.length === 20
          )
      );
    });
    return () => unsubscribe();
  }, [user, setNoteContainer]);

  const deleteNote = async (idToDelete) => {
    if (typeof idToDelete !== "string" || idToDelete.length !== 20) {
      console.error("Note id is not a valid Firestore string:", idToDelete);
      return;
    }
    try {
      await deleteDoc(doc(db, "notes", idToDelete));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const editNote = (id) => {
    navigate(`/notes/${id}`, { state: { edit: true } });
  };

  const noteContainer_els =
    noteContainer && noteContainer.length > 0 ? (
      <>
        {noteContainer.map((note, idx) => (
          <div key={note.id} className="notes-page-note-con">
            <h3 className="notes-page-note-h">{note.note_title}</h3>
            <p className="notes-page-note-p">
              {note.note.length > 200
                ? note.note.slice(0, 200) + "..."
                : note.note}
            </p>
            <button onClick={() => editNote(note.id)}>Edit</button>
            <button
              onClick={() => deleteNote(note.id)}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              Delete
            </button>
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