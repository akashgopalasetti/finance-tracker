import React, { useState } from "react";
import API from "../services/api";
import "../styles/form.css";
function RecordForm({ refresh }) {
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
    notes: "",
  });

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.date) {
      return alert("All fields required");
    }

    try {
      await API.post("/records", form);

      alert("Record added");

      setForm({
        amount: "",
        type: "income",
        category: "",
        date: "",
        notes: "",
      });

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="form-container">
      <h3>Add Record</h3>

      <input
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      /><br />

      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select><br />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      /><br />

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      /><br />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default RecordForm;