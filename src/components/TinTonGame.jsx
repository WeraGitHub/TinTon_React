import React, { useState, useRef, useEffect } from "react";
import GameButton from "./GameButton";

const colors = ["green", "red", "yellow", "blue"];

function TinTonGame() {
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const greenButtonRef = useRef(null);
  const redButtonRef = useRef(null);
  const yellowButtonRef = useRef(null);
  const blueButtonRef = useRef(null);

  const restartGame = () => {
    setSequence([]);
    setIsPlaying(false);
    setCurrentColorIndex(0);
  };

  const addRandomColorToSequence = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      addRandomColorToSequence();
    }
  };

  const handleColorButtonClick = (e) => {
    if (isPlaying) {
      e.target.classList.add("opacity");

      setTimeout(() => {
        e.target.classList.remove("opacity");

        const clickButtonColor = e.target.getAttribute("color");

        // clicked the correct color of the sequence
        if (sequence[currentColorIndex] === clickButtonColor) {
          // if it's all the sequence done - all the required clicks
          if (currentColorIndex === sequence.length - 1) {
            setTimeout(() => {
              setCurrentColorIndex(0);
              addRandomColorToSequence();
            }, 250);
          }
          // otherwise still waiting for more clicks so increment ids
          else {
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
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenButtonRef;
        if (sequence[idx] === "red") ref = redButtonRef;
        if (sequence[idx] === "yellow") ref = yellowButtonRef;
        if (sequence[idx] === "blue") ref = blueButtonRef;

        // highlight the ref button
        setTimeout(() => {
          ref.current.classList.add("opacity");

          setTimeout(() => {
            ref.current.classList.remove("opacity");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };

      showSequence();
    }
  }, [sequence]);

  return (
    <div>
      <h1>TinTon</h1>
      <p>Sequence Memory Game</p>
      <div>
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

      <button onClick={handleNextLevel} >
        {sequence.length === 0 ? "Play" : sequence.length}
      </button>
    </div>
  );
}

export default TinTonGame;