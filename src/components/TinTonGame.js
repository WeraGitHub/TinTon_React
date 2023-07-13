import React, { useState, useEffect } from 'react';

const blue = '#2185CB';
const green = '#29B64C';
const red = '#E82A68';
const yellow = '#EAC606';

const TinTonGame = () => {
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
    setSequence(prevSequence => [...prevSequence, nextButton]);
  };

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setRound(1);
    setMessage('');
    setIsPlaying(true);
  };

  const handleButtonClick = buttonIndex => {
    if (isPlaying) {
      const updatedPlayerSequence = [...playerSequence, buttonIndex];
      setPlayerSequence(updatedPlayerSequence);

      if (!checkSequence(updatedPlayerSequence)) {
        setIsPlaying(false);
        setMessage('Game Over! You clicked the wrong button.');
      } else if (updatedPlayerSequence.length === sequence.length) {
        setPlayerSequence([]);
        setRound(prevRound => prevRound + 1);
        setMessage(`Round ${round + 1}`);
        setTimeout(() => {
          generateSequence();
        }, 1000);
      }
    }
  };

  const checkSequence = playerSequence => {
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
      <p>Sequence Game</p>
      <div className="game-board">
        <button
          style={{ backgroundColor: blue }}
          className={`color-button ${playerSequence.includes(0) ? 'black' : ''}`}
          onClick={() => handleButtonClick(0)}
          disabled={!isPlaying}
        ></button>
        <button
          style={{ backgroundColor: green }}
          className={`color-button ${playerSequence.includes(1) ? 'black' : ''}`}
          onClick={() => handleButtonClick(1)}
          disabled={!isPlaying}
        ></button>
        <span className='divide'></span>
        <button
          style={{ backgroundColor: red }}
          className={`color-button ${playerSequence.includes(2) ? 'black' : ''}`}
          onClick={() => handleButtonClick(2)}
          disabled={!isPlaying}
        ></button>
        <button
          style={{ backgroundColor: yellow }}
          className={`color-button ${playerSequence.includes(3) ? 'black' : ''}`}
          onClick={() => handleButtonClick(3)}
          disabled={!isPlaying}
        ></button>
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
