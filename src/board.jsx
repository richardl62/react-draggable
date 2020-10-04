import React from 'react'
import { Knight } from './pieces';
function Square({black, children} ) {
    const className = 'square' + (black ? ' blackSquare' : '');
    return (
        <div className={className}>
            {children}
        </div>
    )
  }

function renderSquare(row, col, knightPosition)
{
    const black = (row+col) % 2 === 0;
    const isKnight = (row === knightPosition[0])  && (col === knightPosition[1]); 
    return (
        <Square black={black}>
            {isKnight? <Knight /> : null}
        </Square>
    );
}
function Board(props) {
    const {nRows, nCols, knightPosition} = props;

    let squares = [];
    for(let row = 0; row < nRows; ++row) {
        for(let col = 0; col < nCols; ++col) {
            squares.push(renderSquare(row, col, knightPosition))
        }
    }
    
    const style = { // For now
        display: 'grid',
        "grid-template-columns": `repeat(${nCols},50px)`,
        "grid-template-rows": `repeat(${nRows},50px)`,
        width: 'fit-content'
    };
    console.log(style);

    return (
        <div className="board" style={style}> 
            {squares}
        </div>
    );
}

export { Board, Square }