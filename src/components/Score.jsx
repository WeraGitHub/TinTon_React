import React from "react";
import "./Score.css";

const Score = ({sequenceLength}) => (
  <div className="score-info">
    <p>{sequenceLength <= 1 ? "🐶🐶🐶🐶🐶" : `🐶 Score: ${sequenceLength-1} 🐶`}</p>
  </div>    
);

export default Score;