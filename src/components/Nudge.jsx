import React, { useState, useEffect } from "react";
import "./Nudge.css";

const Nudge = ({ nudge }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (nudge) {
      setVisible(true);

      // After 1.5 seconds (1500ms), hide the Nudge component
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [nudge]);

  return visible ? (
    <div className="nudge-modal-container">
      <div className="nudge-modal">
        {nudge}
      </div>
    </div>
  ) : null;
};

export default Nudge;



// (
//   <div className="nudge-modal-container">
//     <div className="nudge-modal">
//       <p>{nudge}</p>
//     </div>
//   </div> 
// );