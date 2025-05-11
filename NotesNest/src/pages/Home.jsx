 
import React from "react";
import { NoteContext } from '../NoteContext';
import { useAuth } from "./../AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./../firebase";
const Home = () => {
    const { user } = useAuth();

  const [note, setNote] = React.useState({});
  const [count, setCount] = React.useState(1);
  const { setNoteContainer, noteContainer } = React.useContext(NoteContext);

  function handleSubmit(e) {
        if (!user) {
      navigate("login");
      return;
        }
      if (!note.note_title || !note.note  || note.note_title.trim() == 0 || note.note.trim() == 0 ) {
    alert("Please fill Valid Details in both fields!");
    return;
  }
    e.preventDefault();
    setNoteContainer(prevNotes => [...prevNotes, note]);
    setNote({})
  }
  React.useEffect(()=>{

    localStorage.setItem("notes", JSON.stringify(noteContainer));
  },[noteContainer])


  function handleChange(event) {
    const { name, value } = event.target;
    setNote((values) => ({
      ...values,
      [name]: value,
      "id": Date.now(),
      "date": new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
     "time": new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    }));

    setCount(prevCount => prevCount + 1)
    
  }

  return (
    <>
      <main className="home-main">
        <h1>📓Notes</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="note_title"
            value={note.note_title || ""}
            onChange={handleChange}
            placeholder="Enter Note Title "
          />
          <textarea
            name="note"
            id="note"
            value={note.note || ""}
            onChange={handleChange}
            placeholder="Enter note here..."
          ></textarea>
          <button>Take Note✏️</button>
        </form>
      </main>
    </>
  );
};

export default Home;
