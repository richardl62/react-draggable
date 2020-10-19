import React from 'react';
import { useDrag } from 'react-dnd';

import { itemTypes } from './constants';

function Knight() {

  const [ {isDragging}, drag ] = useDrag({
    item: {type: itemTypes.KNIGHT},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  });


  return <div 
    className="piece"
    ref={drag}
    style={{
      opacity: isDragging ? 0.5 : 1.0,
      cursor: 'move',
    }}
  >
    &#x2658;
  </div>;  // Unicode white knight
}

function Piece({corePiece}) {
    
  if(corePiece === itemTypes.KNIGHT) {
      return <Knight/>
    }

  if (corePiece == null) {
    return null;
  }

  throw new Error("Pieces other than knights are not yet supported");
}

function makeCorePiece(name) {
  if(name === 'knight') {
    return itemTypes.KNIGHT;
  }

  throw new Error(`Bad name for core piece: ${name}`);
}
export { Piece, makeCorePiece }