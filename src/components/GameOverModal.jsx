import React from "react";
import "./GameOverModal.css";

const GameOverModal = ({ onClick, name, score }) => (
  <div className="game-over-modal-mask">
    <div className="game-over-modal">
      <div className="message-area">
         <p>Game Over {name}!</p>
         <p className="small-p">You clicked on the wrong button silly!</p>
         <p>Your score: {score}</p>
         <p>🐶</p>      
      </div>
      <button className="game-over-start-button" onClick={onClick}>
        Start again?
      </button>
    </div>
  </div>
);

export default GameOverModal;
