import React from 'react';
import { useDrag } from 'react-dnd';

import { itemTypes } from './constants';

const blackPieceNames = ['bC', 'bK', 'bB', 'bQ', 'bK', 'bP'];
const whitePieceNames = ['wC', 'wK', 'wB', 'wQ', 'wK', 'wP'];

const pieceNames = blackPieceNames.concat(whitePieceNames);

let lastUsedId = 0;

function Piece({corePiece}) {

  const [ , drag ] = useDrag({
    item: {
      type: itemTypes.PIECE,
      id: corePiece.id,
    },
  });


  return <div 
    className="piece"
    ref={drag}
  >
    {corePiece.name}
  </div>;  // Unicode white knight
}

class CorePiece {
  constructor({name, dragBehaviour}) {

    if(!pieceNames.includes(name)) {
      throw new Error(`CorePiece given unrecognised piece name: ${name}`)
    }

    if(!['move', 'copy'].includes(dragBehaviour)) {
      throw new Error(`CorePiece give unrecognised drag behaviour: ${dragBehaviour}`)
    }

    ++lastUsedId;

    this._id = lastUsedId;  // ? Use Symbol instead ?
    this._name = name;
    this._moveWhenDragged = dragBehaviour === 'move';
    Object.freeze(this);
  }

  get id() {return this._id;}
  get name() {return this._name;}

  // Exactly one of moveWhenDragged and copyWhenDragged will be true
  get moveWhenDragged() { return this.__moveWhenDragged; }
  get copyWhenDragged() { return !this._moveWhenDragged; }
};

export { Piece, CorePiece, blackPieceNames, whitePieceNames }