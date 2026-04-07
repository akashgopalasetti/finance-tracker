import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3>Finance Dashboard</h3>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;