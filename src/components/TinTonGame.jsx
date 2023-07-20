import React, { useState, useRef, useEffect } from "react";
import "./TinTonGame.css";
import Header from "./Header";
import GameButton from "./GameButton";
import Score from "./Score";
import Nudge from "./Nudge";
import StartModal from "./StartModal";
import GameOverModal from "./GameOverModal";
import ScoreBoard from "./ScoreBoard";

const colors = ["green", "red", "yellow", "blue"];

function TinTonGame() {
  const [sequence, setSequence] = useState([]);  // State for the sequence of colors to remember
  const [isPlaying, setIsPlaying] = useState(false);  // State to control the game's playing status  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);  // State to keep track of the index of the current color to click
  const [nudge, setNudge] = useState('');  // state for message to display when it's players turn   
  const [isShowingSequence, setIsShowingSequence] = useState(false);// State to determine if the sequence is being shown or not
  const [name, setName] = useState('');  // player's name  
  const [isFreshStart, setIsFreshStart] = useState(true);  // played before or is it the very first time?
  const [score, setScore] = useState(0);
  const [showScoreBoard, setShowScoreBoard] = useState(false);

  // Refs for each color button to access the DOM element
  const greenButtonRef = useRef(null);
  const redButtonRef = useRef(null);
  const yellowButtonRef = useRef(null);
  const blueButtonRef = useRef(null);

  const resetGame = () => {
    setSequence([]);
    setIsPlaying(false);
    setCurrentColorIndex(0);
  };

  const addRandomColorToSequence = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  // Start the game!
  const handleStart = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      addRandomColorToSequence();
      setIsFreshStart(false);
    }
  };

  const scoreBoard = () => {  
    if (showScoreBoard) {
      setShowScoreBoard(false);
    } else {
      setShowScoreBoard(true);
    }
  };

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
            setNudge("");
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
          if ( sequence.length > 0 ){
            setScore(sequence.length-1);
          } 
          resetGame();
        }
      }, 250);
    }
  };

  useEffect(() => {
    setIsShowingSequence(true);
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
            if (idx < sequence.length - 1) {
              showSequence(idx + 1);
            } else {
              setNudge("👉 Your turn! 👈");
              setIsShowingSequence(false);
            }
          }, 250);
          
        }, 250);
      };

      // Show the sequence of colors one by one
      showSequence();
    }
  }, [sequence]);

  return (
    <div>
      <Header />    

      <Score sequenceLength={sequence.length} />
      
      <div className="game-board">
        <div>
          <GameButton
            color="blue"
            onClick={handleColorButtonClick}
            className="game-button blue"
            disabled={isShowingSequence}
            ref={blueButtonRef}
          />
          <GameButton
            color="green"
            onClick={handleColorButtonClick}            
            className="game-button green"
            disabled={isShowingSequence}
            ref={greenButtonRef}
          />
        </div>
        <div>
          <GameButton
            color="red"
            onClick={handleColorButtonClick}
            className="game-button red"
            disabled={isShowingSequence}
            ref={redButtonRef}
          />
          <GameButton
            color="yellow"
            onClick={handleColorButtonClick}
            className="game-button yellow"
            disabled={isShowingSequence}
            ref={yellowButtonRef}
          />
        </div>
      </div>

      <Nudge nudge={nudge}/>
      {/* show Start button only when the haven't started yet */}
      {!isPlaying && isFreshStart && <StartModal onClick={handleStart} scoreBoard={scoreBoard} setName={setName}/>}
      {/* show Game Over with option to start again */}
      {!isPlaying && !isFreshStart && <GameOverModal onClick={handleStart} scoreBoard={scoreBoard} name={name} score={score}/>}
      {showScoreBoard && <ScoreBoard scoreBoard={scoreBoard}/>}
      
    </div>
  );
}

export default TinTonGame;
