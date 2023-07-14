import React, { forwardRef } from "react";

const GameButton = forwardRef(({ color, onClick, className }, ref,) => (
  <button
    className={className}
    color={color}
    onClick={onClick}
    ref={ref}
    // disabled={disabled}
  />
));

export default GameButton;