import React from 'react'
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../AuthContext";

const NotesDetail = () => {
  const [currentNote, setCurrentNote] = React.useState(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const { user } = useAuth();
  const navigate = useNavigate();
  let params = useParams()
  const location = useLocation();

  React.useEffect(() => {
    if (!user) return;
    const fetchNote = async () => {
      const docRef = doc(db, "notes", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentNote({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchNote();
  }, [params.id, user]);

  React.useEffect(() => {
    if (location.state && location.state.edit) {
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "notes", currentNote.id), {
      note_title: currentNote.note_title,
      note: currentNote.note,
    });
    setIsEditing(false);
  };

  const deleteNote = async (idToDelete) => {
    if (window.confirm("Delete this note?")) {
      await deleteDoc(doc(db, "notes", idToDelete));
      navigate(`../notes`);
    }
  };

  if (!currentNote) {
    return (
      <>
        <div>Note not found</div>
        <Link to="../notes">See All Notes</Link>
      </>
    )
  };

  return (
    <div>
      <h2>Note Detail</h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="note_title"
            value={currentNote.note_title}
            onChange={handleChange}
          />
          <textarea
            name="note"
            value={currentNote.note}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: "1rem" }}>Cancel</button>
          <p>{currentNote.date}</p>
          <p>{currentNote.time}</p>
        </div>
      ) : (
        <div>
          <Link to="../notes">See All Notes</Link>
          <h2>{currentNote.note_title}</h2>
          <p>{currentNote.note}</p>
          <p>{currentNote.date}</p>
          <p>{currentNote.time}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteNote(currentNote.id)} style={{ marginLeft: "1rem", color: "red" }}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default NotesDetail