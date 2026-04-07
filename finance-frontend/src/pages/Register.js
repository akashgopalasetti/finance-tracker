import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-box">
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br /><br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} /><br /><br />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="viewer">Viewer</option>
        <option value="analyst">Analyst</option>
        <option value="admin">Admin</option>
      </select><br /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
    </div>
  );
}

export default Register;