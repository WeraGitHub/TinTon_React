import React from "react";
import "./StartButton.css";

const StartButton = ({ onClick }) => (
  <button className="start-button" onClick={onClick}>
    Start
  </button>
);

export default StartButton;