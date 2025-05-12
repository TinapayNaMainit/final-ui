import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onCreateClick }) => (
  <nav className="navbar">
    <div className="navbar-title">
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        Abydos Board
      </Link>
    </div>
    <div className="navbar-buttons">
      <button onClick={onCreateClick}>Create a Thread</button>
      <Link to="/about">
        <button>About</button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
