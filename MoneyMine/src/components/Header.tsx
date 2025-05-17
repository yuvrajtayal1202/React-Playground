import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyles = {
    textDecoration: "underline",
    color: "#919191",
  };


  return (
    <div className="header">
      {/* <div className="header-name" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>z
        <NavLink to = "/">#MoneyMine</NavLink>
      </div> */}
      <div className="header-links">
        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
          Home
        </NavLink>
        <NavLink to="/notes" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
          Notes
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
          About
        </NavLink>
      
          <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyles : undefined)}>
            Login
        </NavLink>
      </div>
    </div>
  );
};

export default Header;