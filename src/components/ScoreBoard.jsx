import React from "react";
import "./ScoreBoard.css";
import { getTop5ScoresFromLocalStorage } from './scoreStorage';

const ScoreBoard = ({ onClose }) => {
  const scores = getTop5ScoresFromLocalStorage();

  return (
    <div className="game-over-modal-mask">
      <p>hello</p>
      <div>
        {scores.map((score, index) => (
          <div key={index}>
            <span>{score.name}</span>: <span>{score.score}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ScoreBoard;
