import React from 'react';
import BoardSquare  from './square';

function addHeader(nCols, elems, rowName) {
    const key = elemName => rowName + '-' + elemName;
    elems.push(<div key={key('start')} />);
    for (let col = 1; col <= nCols; ++col) {
        elems.push(
            <div
                key={key(col)}
                className='column-number'
            >
                {col}
            </div>
        );
    }
    elems.push(<div key={key('end')} />);
}

function addRow(layout, row, movePiece, elems) {

    const key = elemName =>  'r' + row + '-' + elemName;
    
    const letter = String.fromCharCode(65+row);

    elems.push(
        <div
            key={key('start')}
            className='row-letter'
        >
            {letter}
        </div>
    );
    
    for (let col = 0; col < layout.nCols; ++col) {
        elems.push(
            <BoardSquare
                index={col}
                key={key(col)}

                corePiece={layout.corePiece(row, col)}
                movePiece={movePiece}
                isBlack={layout.isBlack(row, col)}

                row={row}
                col={col}
            />
        );
    }

    elems.push(
        <div
            key={key('end')}
            className='row-letter'
        >
            {letter}
        </div>
    );
}

function Board({layout, movePiece}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let elems = [];

    addHeader(nCols, elems, 'top');
    for (let row = 0; row < nRows; ++row) {
        addRow(layout, row, movePiece, elems);
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
