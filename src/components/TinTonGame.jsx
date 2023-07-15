import React, { useState, useRef, useEffect } from "react";
import GameButton from "./GameButton";

const colors = ["green", "red", "yellow", "blue"];

function TinTonGame() {
  // State for the sequence of colors to remember
  const [sequence, setSequence] = useState([]);
  // State to control the game's playing status
  const [isPlaying, setIsPlaying] = useState(false);
  // State to keep track of the index of the current color to click
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Refs for each color button to access the DOM element
  const greenButtonRef = useRef(null);
  const redButtonRef = useRef(null);
  const yellowButtonRef = useRef(null);
  const blueButtonRef = useRef(null);

  // Function to restart the game
  const restartGame = () => {
    setSequence([]);
    setIsPlaying(false);
    setCurrentColorIndex(0);
  };

  // Function to add a random color to the sequence
  const addRandomColorToSequence = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  // Function to handle the "Next Level" button click
  const handleNextLevel = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      addRandomColorToSequence();
    }
  };

  // Function to handle the color button click
  const handleColorButtonClick = (e) => {
    if (isPlaying) {
      // Add a temporary opacity class for visual feedback
      e.target.classList.add("opacity");

      setTimeout(() => {
        // Remove the temporary opacity class
        e.target.classList.remove("opacity");

        const clickButtonColor = e.target.getAttribute("color");

        // Check if the clicked color matches the required color in the sequence
        if (sequence[currentColorIndex] === clickButtonColor) {
          // If it's all the sequence done - all the required clicks
          if (currentColorIndex === sequence.length - 1) {
            setTimeout(() => {
              // Reset the current color index and add a new random color to the sequence
              setCurrentColorIndex(0);
              addRandomColorToSequence();
            }, 250);
          } else {
            // Otherwise, still waiting for more clicks, so increment the index
            setCurrentColorIndex(currentColorIndex + 1);
          }
        }
        // or failed:
        else {
          //add a message to highlight the loosership
          restartGame();
        }
      }, 250);
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      // Function to show the sequence of colors
      const showSequence = (idx = 0) => {
        let ref = null;

        // Set the ref based on the color in the sequence
        if (sequence[idx] === "green") ref = greenButtonRef;
        if (sequence[idx] === "red") ref = redButtonRef;
        if (sequence[idx] === "yellow") ref = yellowButtonRef;
        if (sequence[idx] === "blue") ref = blueButtonRef;

        // highlight the ref button
        setTimeout(() => {
          ref.current.classList.add("opacity");

          setTimeout(() => {
            // Remove the temporary opacity class after a delay
            ref.current.classList.remove("opacity");
            // If there are more colors in the sequence, show the next one
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };

      // Show the sequence of colors one by one
      showSequence();
    }
  }, [sequence]);

  return (
    <div>
      <h1>TinTon</h1>
      <p>Sequence Memory Game</p>
      <div>
        {/* Render the color buttons */}
        <GameButton
          color="blue"
          onClick={handleColorButtonClick}
          className="color-button blue"
          // disabled={!isPlaying}
          ref={blueButtonRef}
        />
        <GameButton
          color="green"
          onClick={handleColorButtonClick}
          className="color-button green"
          ref={greenButtonRef}
        />
      </div>
      <div>
        <GameButton
          color="red"
          onClick={handleColorButtonClick}
          className="color-button red"
          ref={redButtonRef}
        />
        <GameButton
          color="yellow"
          onClick={handleColorButtonClick}
          className="color-button yellow"
          ref={yellowButtonRef}
        />
      </div>

      {/* Render the "Next Level" button */}
      <button onClick={handleNextLevel}>
        {sequence.length === 0 ? "Play" : sequence.length}
      </button>
    </div>
  );
}

export default TinTonGame;
