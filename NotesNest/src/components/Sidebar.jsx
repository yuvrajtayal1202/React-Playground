import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteContext } from "../NoteContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const MIN_WIDTH = 120;
const MAX_WIDTH = 400;
const EMOJI_SPACE = 48;

const Sidebar = ({ sidebarWidth, setSidebarWidth }) => {
  const { noteContainer, setNoteContainer } = React.useContext(NoteContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dragging = React.useRef(false);

  // Clear notes when user logs out
  React.useEffect(() => {
    if (!user) setNoteContainer([]);
  }, [user, setNoteContainer]);

  // Real-time Firestore sync for logged-in user, filter out non-Firestore notes
  React.useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNoteContainer(
        querySnapshot.docs
          .map(docSnap => ({
            id: docSnap.id, // Firestore doc id is always a string
            ...docSnap.data()
          }))
          .filter(note => typeof note.id === "string" && note.id.length === 20) // Firestore IDs are 20 chars
      );
    });
    return () => unsubscribe();
  }, [user, setNoteContainer]);

  const charsToShow = Math.max(2, Math.floor((sidebarWidth - EMOJI_SPACE) / 9));

  const onMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = "ew-resize";
  };
  const onMouseUp = () => {
    dragging.current = false;
    document.body.style.cursor = "";
  };
  const onMouseMove = (e) => {
    if (dragging.current) {
      let newWidth = e.clientX;
      if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
      if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
      setSidebarWidth(newWidth);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  const handleEdit = (id) => {
    navigate(`/notes/${id}`, { state: { edit: true } });
  };

  // Delete note instantly, no confirm or alert
  const handleDelete = async (id) => {
    if (typeof id !== "string" || id.length !== 20) {
      console.error("Note id is not a valid Firestore string:", id);
      return;
    }
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div
      className="sidebar-main"
      style={{
        width: sidebarWidth,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        background: "rgb(235 235 235)",
        zIndex: 10,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        height: "90vh",
      }}
    >
      <h2>Your Notes</h2>
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {noteContainer && noteContainer.length > 0 ? (
          noteContainer.map((noteCon) => (
            <li
              key={`notes/${noteCon.id}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Link
                className="sidebar-li"
                to={`/notes/${noteCon.id}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {noteCon.note_title && noteCon.note_title.length > charsToShow
                  ? noteCon.note_title.slice(0, charsToShow) + "..."
                  : noteCon.note_title}
              </Link>
              <span
                style={{ cursor: "pointer", marginLeft: "8px" }}
                title="Edit"
                onClick={() => handleEdit(noteCon.id)}
              >
                ✏️
              </span>
              <span
                style={{ cursor: "pointer", marginLeft: "8px", color: "red" }}
                title="Delete"
                onClick={() => handleDelete(noteCon.id)}
              >
                🗑️
              </span>
            </li>
          ))
        ) : (
          <li>No notes yet.</li>
        )}
      </ul>
      {/* Resizer handle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "6px",
          height: "100%",
          cursor: "ew-resize",
          background: "#aaa",
          zIndex: 100,
          userSelect: "none",
          marginLeft: "5px",
        }}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export default Sidebar;