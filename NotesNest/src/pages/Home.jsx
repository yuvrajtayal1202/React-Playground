import React from "react";
import { NoteContext } from '../NoteContext';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
const Home = () => {
  const { user } = useAuth();
  const [note, setNote] = React.useState({});
  const { setNoteContainer } = React.useContext(NoteContext);
  const navigate = useNavigate();

 function handleSubmit(e) {
  e.preventDefault();
  if (!user) {
    // Save note to localStorage before redirect
    localStorage.setItem("pendingNote", JSON.stringify(note));
    navigate("/login");
    return;
  }
  if (!note.note_title || !note.note) {
    alert("Please fill in both fields!");
    return;
  }
  addDoc(collection(db, "notes"), {
    ...note,
    uid: user.uid,
    email: user.email,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  }).then(() => {
    setNote({});
  }).catch((err) => {
    alert("Error saving note: " + err.message);
  });
}

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((values) => ({
      ...values,
      [name]: value,
      "date": new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      "time": new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    }));
  }

  React.useEffect(() => {
    if (!user) {
      setNote({});
    }
  }, [user]);

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