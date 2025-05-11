import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoteContext } from "../NoteContext";
const MIN_WIDTH = 120;
const MAX_WIDTH = 400;
const EMOJI_SPACE = 48;

const Sidebar = ({ sidebarWidth, setSidebarWidth }) => {
  const { noteContainer, setNoteContainer } = React.useContext(NoteContext);
  const navigate = useNavigate();
  const dragging = React.useRef(false);

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
        {noteContainer.map((noteCon) => (
          <li
            key={`notes/${noteCon.id}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              className="sidebar-li"
              to={`notes/${noteCon.id}`}
              style={{
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {noteCon.note_title.length > charsToShow
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
              style={{ cursor: "pointer", marginLeft: "8px" }}
              title="Delete"
              onClick={() => {
                const updatedNotes = noteContainer.filter(
                  (note) => note.id !== noteCon.id
                );
                setNoteContainer(updatedNotes);
                localStorage.setItem("notes", JSON.stringify(updatedNotes));
              }}
            >
              ❌
            </span>
          </li>
        ))}
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
