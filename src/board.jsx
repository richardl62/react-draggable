import React from 'react'
import { Knight } from './pieces';
import { processSquareClick } from './game';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function requiredDefined(...args) {
    args.forEach(arg => {
        if (arg === undefined) {
            console.log('required arguments in undefined in', args)
            throw new Error('required arguments in undefined in', args);
        }
    });
}

function Square({ black, children, onClick }) {
    const className = 'square' + (black ? ' blackSquare' : '');
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>

    );
}


function renderSquare(row, col, boardProps) {
    const { config, knightPosition } = boardProps;
    const { nRows, nCols, topLeftBlack } = config;
    requiredDefined(nRows, nCols, topLeftBlack, knightPosition);

    const isKnight = (row === knightPosition[0]) && (col === knightPosition[1]);
    const asTopleft = (row + col) % 2 === 0;
    const black = topLeftBlack ? asTopleft : !asTopleft;
    const index = row * nCols + col;
    return (
        <Square black={black} onClick={() => processSquareClick(row, col)} key={[row, col]} index={index}>
            {isKnight ? <Knight /> : null}
        </Square>
    );

}

function Board(props) {
    const { config } = props;
    const { nRows, nCols } = config;

    let squares = [];
    for (let row = 0; row < nRows; ++row) {
        for (let col = 0; col < nCols; ++col) {
            squares.push(renderSquare(row, col, props));
        }
    }

    const style = { // For now
        display: 'grid',
        gridTemplateColumns: `repeat(${nCols},50px)`,
        gridTemplateRows: `repeat(${nRows},50px)`,
        width: 'fit-content',
    };

    return (
        <DndProvider backend={HTML5Backend} >
            <div className="board" style={style}>
                {squares}
            </div>
        </DndProvider>
    );
}

export { Board, Square }