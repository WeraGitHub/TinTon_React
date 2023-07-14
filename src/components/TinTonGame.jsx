import React, { useState, useRef, useEffect } from "react";
import GameButton from "./GameButton";

const colors = ["green", "red", "yellow", "blue"];

function TinTonGame() {
  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      addNewColor();
    }
  };

  const handleColorClick = (e) => {
    if (playing) {
      e.target.classList.add("opacity");

      setTimeout(() => {
        e.target.classList.remove("opacity");

        const clickColor = e.target.getAttribute("color");

        // clicked the correct color of the sequence
        if (sequence[playingIdx] === clickColor) {
          // clicked the last color of the sequence
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          }

          // missing some colors of the sequence to be clicked
          else {
            setPlayingIdx(playingIdx + 1);
          }
        }

        // clicked the incorrect color of the sequence
        else {
          resetGame();
          // alert("You Lost!");
        }
      }, 250);
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (idx = 0) => {
        let ref = null;

        if (sequence[idx] === "green") ref = greenRef;
        if (sequence[idx] === "red") ref = redRef;
        if (sequence[idx] === "yellow") ref = yellowRef;
        if (sequence[idx] === "blue") ref = blueRef;

        // highlight the ref
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
          onClick={handleColorClick}
          className="color-button blue"
          // disabled={!playing}
          ref={blueRef}
        />
        <GameButton
          color="green"
          onClick={handleColorClick}
          className="color-button green"
          ref={greenRef}
        />
      </div>
      <div>
        <GameButton
          color="red"
          onClick={handleColorClick}
          className="color-button red"
          ref={redRef}
        />
        <GameButton
          color="yellow"
          onClick={handleColorClick}
          className="color-button yellow"
          ref={yellowRef}
        />
      </div>

      <button onClick={handleNextLevel} >
        {sequence.length === 0 ? "Play" : sequence.length}
      </button>
    </div>
  );
}

export default TinTonGame;