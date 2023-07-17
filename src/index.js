import React from 'react';
import { createRoot } from "react-dom/client";
import TinTonGame from './components/TinTonGame';

// ReactDOM.render(<App />, document.getElementById('root'));
// Use createRoot to render your app instead of ReactDOM.render()
// because ReactDOM.render is no longer supported in React 18.
const root = document.getElementById("root");
createRoot(root).render(<TinTonGame />);