import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import RecordForm from "../components/RecordForm";
import "../styles/dashboard.css";
function Dashboard() {
  const [summary, setSummary] = useState({});
  const [records, setRecords] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const role = user?.role || "viewer";

  useEffect(() => {
    fetchSummary();

    if (role !== "viewer") {
      fetchRecords();
    }
  }, []);


  const fetchSummary = async () => {
    try {
      const res = await API.get("/dashboard");
      setSummary(res.data);
    } catch (err) {
      console.log("Dashboard error", err);
    }
  };

 
  const fetchRecords = async () => {
    try {
      const res = await API.get("/records");
      setRecords(res.data);
    } catch (err) {
      console.log("Records error", err);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await API.delete(`/records/${id}`);
      fetchRecords();
      fetchSummary();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      
      <div class="record-item">
        <SummaryCard title="Income" value={summary?.totalIncome || 0} />
        <SummaryCard title="Expense" value={summary?.totalExpense || 0} />
        <SummaryCard title="Balance" value={summary?.balance || 0} />
      </div>
      <div class="box">
      {role === "admin" && (
        <RecordForm refresh={() => { fetchRecords(); fetchSummary(); }} />
      )}

      {role === "viewer" ? (
        <p style={{ textAlign: "center" }}>View Only Access</p>
      ) : (
        <>
          <h3>Records</h3>

          {records?.length === 0 ? (
            <p>No records found</p>
          ) : (
            records?.map((r) => (
              <div key={r._id}>
                <p><b>{r.category}</b> - ₹{r.amount} ({r.type})</p>

                {role === "admin" && (
                  <button onClick={() => deleteRecord(r._id)}>
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </>
      )}</div>
    </div>
  );
}

export default Dashboard;
