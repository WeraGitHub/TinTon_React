import React, { useState, useEffect, useRef } from 'react';

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
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (isPlaying) {
      generateSequence();
      showSequence();
    }
  }, [isPlaying]);

  const generateSequence = () => {
    const nextButton = Math.floor(Math.random() * 4);
    setSequence(prevSequence => [...prevSequence, nextButton]);
  };

  const showSequence = async () => {
    console.log(sequence);
    for (let i = 0; i < sequence.length; i++) {
      const buttonId = sequence[i];
      await delay(500); // Delay for half a second
      changeButtonColor(buttonId, 'black');
      await delay(500); // Show the button in black for half a second
      changeButtonColor(buttonId, 'original'); // Change back to the original color
      await delay(500); // Delay for half a second before showing the next button
    }
  };

  const changeButtonColor = (buttonId, color) => {
    const buttonRef = buttonRefs.current[buttonId];
    buttonRef.style.backgroundColor = color;
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const registerButtonRef = (buttonRef, index) => {
    buttonRefs.current[index] = buttonRef;
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
      <p>Sequence Memory Game</p>
      <div className="game-board">
        <button
          ref={(ref) => registerButtonRef(ref, 0)}
          style={{ backgroundColor: blue }}
          className={`color-button ${playerSequence.includes(0) ? 'black' : ''}`}
          onClick={() => handleButtonClick(0)}
          disabled={!isPlaying}
        ></button>
        <button
          ref={(ref) => registerButtonRef(ref, 1)}
          style={{ backgroundColor: green }}
          className={`color-button ${playerSequence.includes(1) ? 'black' : ''}`}
          onClick={() => handleButtonClick(1)}
          disabled={!isPlaying}
        ></button>
        <span className="divide"></span>
        <button
          ref={(ref) => registerButtonRef(ref, 2)}
          style={{ backgroundColor: red }}
          className={`color-button ${playerSequence.includes(2) ? 'black' : ''}`}
          onClick={() => handleButtonClick(2)}
          disabled={!isPlaying}
        ></button>
        <button
          ref={(ref) => registerButtonRef(ref, 3)}
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
        {!isPlaying && <button>Rules</button>}
      </div>
    </div>
  );
};

export default TinTonGame;
