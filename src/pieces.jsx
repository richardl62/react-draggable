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

export { Knight }