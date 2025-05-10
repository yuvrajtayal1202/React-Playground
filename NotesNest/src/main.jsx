import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NoteContext } from "./NoteContext";

function NoteProvider(){
    const [noteContainer, setNoteContainer] = useState([]);
    return(
    <NoteContext.Provider value={{ noteContainer, setNoteContainer }}>
    <App />
  </NoteContext.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <NoteProvider/>
        // <App />

);
