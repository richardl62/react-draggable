import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './board';
import {setObserver, boardLayout} from './game';
import * as serviceWorker from './serviceWorker';
import './main.css';

const root = document.getElementById('root');

setObserver(pieces => {
  ReactDOM.render(
    <React.StrictMode>
      <Board layout={boardLayout} pieces={pieces} />
    </React.StrictMode>,
    root
  );
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
