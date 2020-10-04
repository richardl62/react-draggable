import React from 'react';

import { Board } from './board';
import './App.css'


function App() {
  return (
    <Board nRows={6} nCols={4} knightPosition={[1, 0]} />
  );
}

export default App;
