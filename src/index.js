import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Board } from './board';
import * as serviceWorker from './serviceWorker';
import { observe } from './game'

const root = document.getElementById('root');

let boardConfig = {
  nRows: 2,
  nCols: 4,
  topLeftBlack: false,
}

observe(boardConfig, knightPosition => {
  ReactDOM.render(
    <React.StrictMode>
      <Board config={boardConfig} knightPosition={knightPosition}/>
    </React.StrictMode>,
    root
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
