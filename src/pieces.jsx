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
  </div>;  // Umicode white knight
}

function Piece({type}) {
    
  if(type === itemTypes.KNIGHT) {
      return <Knight></Knight>
    }

  if (type) {
    throw new Error("Pieces other than knights are not yet supported");
  }

    return null;
}
export { Piece }