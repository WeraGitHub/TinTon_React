import React from 'react';

const Button = ({ color, isBlack, onClick, disabled }) => {
  return (
    <button
      className={`color-button ${isBlack && 'black'}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      disabled={disabled}
    ></button>
  );
};

export default Button;
