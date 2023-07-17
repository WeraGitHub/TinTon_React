import React from "react";

const Score = ({sequenceLength}) => (
  <div className="score-info">
    <p>{sequenceLength <= 1 ? "🐶🐶🐶🐶🐶" : `🐶 Score: ${sequenceLength-1} 🐶`}</p>
  </div>    
);

export default Score;