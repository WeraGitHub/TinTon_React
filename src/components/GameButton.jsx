import React, { forwardRef } from "react";

const GameButton = forwardRef(({ color, className, onClick }, ref) => (
  <button
    className={className}
    color={color}
    onClick={onClick}
    ref={ref}
    // disabled={disabled}
  />
));

export default GameButton;