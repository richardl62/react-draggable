import React from 'react';
import { useDrag } from 'react-dnd';

import { itemTypes } from './constants';


import SVGPiece from 'react-chess-pieces';

const blackPieceNames = ['p', 'n',  'b',  'r',  'q',  'k'];
const whitePieceNames = ['P', 'N',  'B',  'R',  'Q',  'K' ];


const pieceNames = blackPieceNames.concat(whitePieceNames);

class CorePiece {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
};

class CorePieceFactory {

  constructor() {
    this._lastUsedId = 0;
  }

  // Input can be a piece to copy, the name of a piece or null
  make(input = null) {

    if (input === null) {
      return null;
    }

    if(input instanceof CorePiece) {
      return this.make(input.name);
    }

    if (!pieceNames.includes(input)) {
      throw new Error(`CorePieceFactor.make() given unrecognised input: ${input}`)
    }

    ++this._lastUsedId;

    return new CorePiece(input, this._lastUsedId);
  }
}

function Piece({ corePiece, gameCallbacks }) {

  const [, drag] = useDrag({
    item: {
      type: itemTypes.PIECE,
      id: corePiece.id,
    },
    begin: () => console.log(`Drag begin ${corePiece.id}`),
    end: (item, monitor) => gameCallbacks.dragEnd(corePiece.id, monitor.didDrop()),
  });


  return (<div
    className="piece"
    ref={drag}
  >
    <SVGPiece piece={corePiece.name} />
  </div>);  
}

export { Piece, CorePieceFactory, blackPieceNames, whitePieceNames }