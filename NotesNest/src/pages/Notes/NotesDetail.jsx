import React from 'react'
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { NoteContext } from '../../NoteContext';

const NotesDetail = () => {
  const [currentNote, setCurrentNote] = React.useState(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const { setNoteContainer, noteContainer } = React.useContext(NoteContext);
    const navigate = useNavigate();
  
  let params = useParams()
  const location = useLocation();

  React.useEffect(() => {
    const stored_notes = JSON.parse(localStorage.getItem("notes"));
    if (stored_notes) {
      const found = stored_notes.find(notesobj => notesobj.id == params.id)
      setCurrentNote(found || null)
    }
  }, [params.id, noteContainer])

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

  const handleSave = () => {
    const updatedNotes = noteContainer.map(note =>
      note.id == currentNote.id ? currentNote : note
    );
    setNoteContainer(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setIsEditing(false);
  };

  if (!currentNote){
    return(
      <>
    <div>Note not found</div>
    <Link to="../notes">See All Notes</Link>
      </>
  )
  };
  const deleteNote = (idToDelete) => {
  const updatedNotes = noteContainer.filter(note => note.id !== idToDelete);
  setNoteContainer(updatedNotes);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigate(`../notes`);

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
                      <button onClick={() => deleteNote(currentNote.id)}>Delete</button>

        </div>
      )}
    </div>
  )
}

export default NotesDetail