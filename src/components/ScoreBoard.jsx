import React from "react";
import "./ScoreBoard.css";
import { getTop5ScoresFromLocalStorage } from './scoreStorage';

const ScoreBoard = ({ onClose }) => {
  const top5scores = getTop5ScoresFromLocalStorage();

  return (
    <div className="score-board-mask">
      <div className="score-board-modal">
        <p>Top 5 highscores</p>
        <div className="score-list">
          {top5scores.map((score, index) => (
            <div key={index} className="score-div">
              <span>{index+1}. {score.name}</span>: <span>{score.score}</span>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ScoreBoard;
