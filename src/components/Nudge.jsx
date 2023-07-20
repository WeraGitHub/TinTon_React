import React from "react";
import "./Nudge.css";

const Nudge = ({ nudge }) => (
  <div className="nudge-container">
    <p>{nudge}</p>
  </div> 
);

export default Nudge;



// (
  // <div className="nudge-modal-container">
  //   <div className="nudge-modal">
  //     <p>{nudge}</p>
  //   </div>
  // </div> 
// );