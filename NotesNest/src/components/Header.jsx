import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const activeStyles = {
    textDecoration: "underline",
    color: "#919191",
  };
  return (
    <div className="header">
        <div className="header-name">
            <h2>#NotesNest</h2>
        </div>
      <div className="header-links">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="notes"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Notes
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>

        <NavLink
          to="login"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Login
        </NavLink>


      </div>
    </div>
  );
};

export default Header;
