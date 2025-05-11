import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NoteContext } from "./NoteContext";
import { AuthProvider } from "./AuthContext";

function NoteProvider(){
    React.useEffect(() => {
  const stored = localStorage.getItem("notes");
  if (stored) {
    setNoteContainer(JSON.parse(stored));
  }
}, []);
    const [noteContainer, setNoteContainer] = useState([]);
    return(
    <NoteContext.Provider value={{ noteContainer, setNoteContainer }}>
    <App />
  </NoteContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>

    <NoteProvider/>
      </AuthProvider>

        // <App />

);
