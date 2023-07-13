import React, { useState, useEffect } from 'react';
import Button from './Button';

const TinTonGame = () => {
  const colors = ['red', 'green', 'blue', 'yellow'];
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      generateSequence();
    }
  }, [isPlaying]);

  const generateSequence = () => {
    const nextButton = Math.floor(Math.random() * 4);
    setSequence((prevSequence) => [...prevSequence, nextButton]);
  };

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setRound(1);
    setMessage('');
    setIsPlaying(true);
  };

  const handleButtonClick = (buttonIndex) => {
    if (isPlaying) {
      const updatedPlayerSequence = [...playerSequence, buttonIndex];
      setPlayerSequence(updatedPlayerSequence);

      if (!checkSequence(updatedPlayerSequence)) {
        setIsPlaying(false);
        setMessage('Game Over! You clicked the wrong button.');
      } else if (updatedPlayerSequence.length === sequence.length) {
        setPlayerSequence([]);
        setRound((prevRound) => prevRound + 1);
        setMessage(`Round ${round + 1}`);
        setTimeout(() => {
          generateSequence();
        }, 1000);
      }
    }
  };

  const checkSequence = (playerSequence) => {
    for (let i = 0; i < playerSequence.length; i++) {
      if (playerSequence[i] !== sequence[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <h1>TinTon</h1>
      <p>sequence game</p>
      <div className="game-board">
        {colors.map((color, index) => (
          <Button
            key={index}
            color={color}
            isBlack={playerSequence.includes(index)}
            onClick={() => handleButtonClick(index)}
            disabled={!isPlaying}
          />
        ))}
      </div>
      <div className="game-info">
        <p>{message}</p>
        {!isPlaying && (
          <button className="start-button" onClick={startGame}>
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default TinTonGame;
