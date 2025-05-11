import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../main";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
  const activeStyles = {
    textDecoration: "underline",
    color: "#919191",
  };
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Fetch user's name from Firestore if logged in
  useEffect(() => {
    const fetchName = async () => {
      if (user) {
        // Try Firestore first
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || user.displayName || "");
        } else if (user.displayName) {
          setUserName(user.displayName);
        } else {
          setUserName("");
        }
      } else {
        setUserName("");
      }
    };
    fetchName();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="header-name" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2>#NotesNest</h2>
        {user && userName && (
          <span style={{ fontSize: "1.1rem", color: "#f5c518" }}>Hi, {userName}!</span>
        )}
      </div>
      <div className="header-links">
        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Home
        </NavLink>
        <NavLink to="/notes" style={({ isActive }) => (isActive ? activeStyles : null)}>
          Notes
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyles : null)}>
          About
        </NavLink>
        {!user ? (
          <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Login
          </NavLink>
        ) : (
          <NavLink
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        )}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            marginLeft: "1rem",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          title="Toggle dark mode"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Header;