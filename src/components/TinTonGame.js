import React, { useState, useEffect } from 'react';

const blue = '#2185CB';
const green = '#29B64C';
const red = '#E82A68';
const yellow = '#EAC606';

const Game = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonColor, setButtonColor] = useState([blue, green, red, yellow]);
  const [randomButtonIndex, setRandomButtonIndex] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [round, setRound] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer;
    if (isPlaying) {
      if (round > 3) {
        setIsPlaying(false);
      } else if (randomButtonIndex !== null) {
        timer = setTimeout(() => {
          setButtonColor((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[randomButtonIndex] = getColorByIndex(randomButtonIndex);
            return updatedColors;
          });
          setRandomButtonIndex(null);
          setRound((prevRound) => prevRound + 1);
        }, 500);
      } else {
        timer = setTimeout(() => {
          const newRandomButtonIndex = Math.floor(Math.random() * 4);
          setButtonColor((prevColors) => {
            const updatedColors = [...prevColors];
            updatedColors[newRandomButtonIndex] = 'black';
            return updatedColors;
          });
          setSequence((prevNumbers) => [...prevNumbers, newRandomButtonIndex]);
          setRandomButtonIndex(newRandomButtonIndex);
        }, 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, round, randomButtonIndex]);

  const getColorByIndex = (index) => {
    switch (index) {
      case 0:
        return blue;
      case 1:
        return green;
      case 2:
        return red;
      case 3:
        return yellow;
      default:
        return '';
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    const randomNumber = Math.floor(Math.random() * 4);
    const updatedButtonColor = [blue, green, red, yellow];
    updatedButtonColor[randomNumber] = 'black';
    setButtonColor(updatedButtonColor);
    setSequence([randomNumber]);
    setRandomButtonIndex(randomNumber);
    setRound(1);
  };

  const handleButtonClick = () => {
    if (isPlaying && round <= 3) {
      // Add your logic here for handling button clicks during the game
      // You can use the sequence state to check the correct sequence
      // and update the game state accordingly
    }
  };

  const startNextRound = () => {
    const newRandomButtonIndex = Math.floor(Math.random() * 4);
    setButtonColor((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[newRandomButtonIndex] = 'black';
      return updatedColors;
    });
    setSequence((prevNumbers) => [...prevNumbers, newRandomButtonIndex]);
    setRandomButtonIndex(newRandomButtonIndex);
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
      <h1>Color Game</h1>
      <div className="game-board">
        <button
          style={{ backgroundColor: buttonColor[0] }}
          className="color-button"
          disabled={isPlaying}
          onClick={handleButtonClick}
        ></button>
        <button
          style={{ backgroundColor: buttonColor[1] }}
          className="color-button"
          disabled={isPlaying}
          onClick={handleButtonClick}
        ></button>
        <span className="divide"></span>
        <button
          style={{ backgroundColor: buttonColor[2] }}
          className="color-button"
          disabled={isPlaying}
          onClick={handleButtonClick}
        ></button>
        <button
          style={{ backgroundColor: buttonColor[3] }}
          className="color-button"
          disabled={isPlaying}
          onClick={handleButtonClick}
        ></button>
      </div>
      <div className="game-info">
        {!isPlaying && round <= 3 && (
          <button className="start-button" onClick={startGame}>
            Start
          </button>
        )}
        {!isPlaying && round > 3 && <p>Your Turn</p>}
      </div>
    </div>
  );
};

export default Game;
