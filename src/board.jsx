import React from 'react'
import { Knight } from './pieces';

function requiredDefined(...args) {
    args.forEach(arg => {
        if(arg === undefined) {
            console.log('required arguments in undefined in', args)
            throw new Error('required arguments in undefined in', args);
        }
    });
}
function Square({black, children} ) {
    const className = 'square' + (black ? ' blackSquare' : '');
    return (
        <div className={className}>
            {children}
        </div>
    )
  }

function renderSquare(black, isKnight) {
    return (
        <Square black={black}>
            {isKnight? <Knight /> : null}
        </Square>
    );

}
function Board(props) {
    const {config, knightPosition} = props;
    const {nRows, nCols, topLeftBlack} = config;
    requiredDefined(nRows, nCols, topLeftBlack, knightPosition);

    const isBlack = (row, col) => {
        const asTopleft = (row+col) % 2 === 0;
        return topLeftBlack ? asTopleft : !asTopleft;
    };

    let squares = [];
    for(let row = 0; row < nRows; ++row) {
        for(let col = 0; col < nCols; ++col) {
            const isKnight = (row === knightPosition[0])  && (col === knightPosition[1]); 
            squares.push(renderSquare(isBlack(row,col), isKnight));
        }
    }
    
    const style = { // For now
        display: 'grid',
        "grid-template-columns": `repeat(${nCols},50px)`,
        "grid-template-rows": `repeat(${nRows},50px)`,
        width: 'fit-content'
    };

    return (
        <div className="board" style={style}> 
            {squares}
        </div>
    );
}

export { Board, Square }