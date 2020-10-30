import React from 'react';
import { DroppableSquare as BoardSquare } from './square';


function addHeader(nCols, elems, rowName) {
    const key = elemName => rowName + '-' + elemName;
    elems.push(<div key={key('start')} />);
    for (let col = 0; col < nCols; ++col) {
        elems.push(
            <div
                key={key(col)}
                className='board-boarder board-boarder-letter'
            >
                {String.fromCharCode(65+col)}
            </div>
        );
    }
    elems.push(<div key={key('end')} />);
}

function addRow(layout, row, gameOptions, elems) {

    let key = name =>  'r' + row + '-' + name;

    let makeBoarderElem = name => (
        <div
            key={key(name)}
            className='board-boarder board-boarder-number'
        >
            {gameOptions.numberRowsFromTop ? row + 1 : layout.nRows - row}
        </div>
    );

    let makeSquare = col => (
        <BoardSquare
            index={col}
            key={key(col)}

            corePiece={layout.corePiece(row, col)}
            gameOptions={gameOptions}

            // This is the 'conceptual' color which must be black or white.
            color={layout.isBlack(row, col) ? 'black' : 'white'}

            row={row}
            col={col}
        />
    )

    elems.push(makeBoarderElem('start'));

    for (let col = 0; col < layout.nCols; ++col) {
        elems.push(makeSquare(col));
    }

    elems.push(makeBoarderElem('end'));
}

function Board({layout, gameOptions}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let elems = [];

    addHeader(nCols, elems, 'top');
    for (let row = 0; row < nRows; ++row) {
        addRow(layout, row, gameOptions, elems);
    }
    addHeader(nCols, elems, 'bottom');

    const style = { // For now
        display: 'grid',
        gridTemplateColumns: `repeat(${nCols+2},auto)`,
        gridTemplateRows: `repeat(${nRows+2},auto)`,
    };

    return (
        <div className="board" style={style}>
            {elems}
        </div>
    )

}

export { Board }
