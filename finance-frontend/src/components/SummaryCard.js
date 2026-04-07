import React from "react";
import "../styles/card.css";
function SummaryCard({ title, value }) {
  return (
    <div className={`card ${title.toLowerCase()}`}>
      <h4>{title}</h4>
      <p>₹{value}</p>
    </div>
  );
}

export default SummaryCard;