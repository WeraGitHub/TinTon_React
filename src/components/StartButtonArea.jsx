import React, { useRef } from "react";
import "./StartButtonArea.css";

const StartButtonArea = ({ onClick, setName }) => {
  const nameInputRef = useRef(null);

  const handleStartClick = () => {
    const name = nameInputRef.current.value;
    setName(name);
    onClick();
  };

  return (
    <div className="modal-mask">
      <div className="modal">
        <div className="name-area">
          <label>Enter your name:</label>
          <input ref={nameInputRef} id="name" placeholder="Name" />
        </div>
        <button className="start-button" onClick={handleStartClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default StartButtonArea;
