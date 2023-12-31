import { render, screen } from '@testing-library/react';
import App from './App';


test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/TinTon/i);
  expect(headerElement).toBeInTheDocument();
});
