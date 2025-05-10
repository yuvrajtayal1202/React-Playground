import React from "react";
import { Link } from "react-router-dom";
import { NoteContext } from "../NoteContext";

const Sidebar = () => {
  const { noteContainer } = React.useContext(NoteContext);

const noteContainer_title_els = noteContainer.map((noteCon) => {
            return (
              <Link 
              className="sidebar-li" 
              key={`notes/${noteCon.id}`}
              to={`notes/${noteCon.id}`}
              >{noteCon.note_title}</Link>
            );
          })

  return (
    <div>
      <main className="sidebar-main">
        <h2>Your Notes</h2>
        <ul>
          {noteContainer_title_els}
        </ul>
      </main>
    </div>
  );
};

export default Sidebar;
