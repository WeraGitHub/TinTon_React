import React from "react";
import "./GameOverModal.css";

const GameOverModal = ({ onClick, name, score }) => (
  <div className="modal-mask">
    <div className="modal">
      <div className="message-area">
         <p>Game Over {name}!</p>
         <p>You clicked the wrong button.</p>
         <p>Your score is: {score}</p>         
      </div>
      <button className="start-button" onClick={onClick}>
        Start
      </button>
    </div>
  </div>
);

export default GameOverModal;
