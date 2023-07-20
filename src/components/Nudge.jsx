import React from "react";
import "./Nudge.css";

const Nudge = ({nudge}) => (
  <div className="nudge-modal-container">
    <div className="nudge-modal">
      <p>{nudge}</p>
    </div>
  </div> 
);

export default Nudge;