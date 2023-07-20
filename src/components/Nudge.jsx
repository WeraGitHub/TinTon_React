import React, { useState, useEffect } from 'react';
import "./Nudge.css";

const Nudge = ({ nudge }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500); // 500ms (half a second)

    // Cleanup the timer on unmount to avoid potential memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`nudge-modal-container ${visible ? 'visible' : ''}`}>
      <div className="nudge-modal">
        <p>{nudge}</p>
      </div>
    </div> 
  );
};

export default Nudge;


// (
//   <div className="nudge-modal-container">
//     <div className="nudge-modal">
//       <p>{nudge}</p>
//     </div>
//   </div> 
// );