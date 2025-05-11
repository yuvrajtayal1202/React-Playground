import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NoteContext } from "./NoteContext";
import { AuthProvider } from "./AuthContext";

// Dark mode context
export const DarkModeContext = createContext();

function NoteProvider() {
  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      setNoteContainer(JSON.parse(stored));
    }
  }, []);
  const [noteContainer, setNoteContainer] = useState([]);
  return (
    <NoteContext.Provider value={{ noteContainer, setNoteContainer }}>
      <App />
    </NoteContext.Provider>
  );
}

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <DarkModeProvider>
      <NoteProvider />
    </DarkModeProvider>
  </AuthProvider>
);