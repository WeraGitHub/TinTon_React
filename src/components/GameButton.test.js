import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameButton from './GameButton';


test('calls onClick event handler when button is clicked', () => {
  // Mock click event handler
  const onClickMock = jest.fn();
  
  // Render the GameButton with the mock click event handler
  const { getByRole } = render(
    <GameButton color="green" onClick={onClickMock} />
  );
  
  // Get the rendered button element
  const buttonElement = getByRole('button');
  
  // Simulate a click on the button
  fireEvent.click(buttonElement);
  
  // Check if the onClickMock function was called
  expect(onClickMock).toHaveBeenCalled();
});

test('button is disabled when disabled prop is set to true', () => {
    // Mock click event handler
    const onClickMock = jest.fn();
    
    // Render the GameButton with the disabled prop set to true
    const { getByRole } = render(
      <GameButton color="red" onClick={onClickMock} disabled />
    );
    
    // Get the rendered button element
    const buttonElement = getByRole('button');
    
    // Check if the button is disabled
    expect(buttonElement).toBeDisabled();
  });
