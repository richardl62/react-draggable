import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board';
import * as serviceWorker from './serviceWorker';
import { setObserver, knightMove } from './game'

const root = document.getElementById('root');

let boardConfig = {
  nRows: 2,
  nCols: 4,
  topLeftBlack: false,
}

setObserver(knightPosition => {
  ReactDOM.render(
    <React.StrictMode>
      <Board config={boardConfig} knightPosition={knightPosition}/>
    </React.StrictMode>,
    root
  );
});


function moveKnightOneSquare() {
  const { nRows, nCols } = boardConfig;

  if(this.count === undefined) {
    this.count = 0;
  }
  
  knightMove(
    Math.floor(this.count / nCols) % nRows,
    this.count % nCols,
  )
  ++this.count;
}


setInterval(moveKnightOneSquare, 500);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
