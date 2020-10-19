import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './board';
import {setObserver } from './game';
import * as serviceWorker from './serviceWorker';
import './main.css';

const root = document.getElementById('root');

// Render the board to show 'pieces'.
function renderBoard(boardLayout) {
  ReactDOM.render(
    <React.StrictMode>
      <Board layout={boardLayout} />
    </React.StrictMode>,
    root
  );
}

setObserver(renderBoard);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
