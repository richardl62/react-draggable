import React from 'react';
import BoardSquare  from './square';


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

function addRow(layout, row, gameCallbacks, elems) {

    const key = elemName =>  'r' + row + '-' + elemName;

    elems.push(
        <div
            key={key('start')}
            className='board-boarder board-boarder-number'
        >
            {row+1}
        </div>
    );
    
    for (let col = 0; col < layout.nCols; ++col) {
        elems.push(
            <BoardSquare
                index={col}
                key={key(col)}

                corePiece={layout.corePiece(row, col)}
                gameCallbacks={gameCallbacks}
                isBlack={layout.isBlack(row, col)}

                row={row}
                col={col}
            />
        );
    }

    elems.push(
        <div
            key={key('end')}
            className='board-boarder board-boarder-number'
        >
            {row+1}
        </div>
    );
}

function Board({layout, gameCallbacks}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let elems = [];

    addHeader(nCols, elems, 'top');
    for (let row = 0; row < nRows; ++row) {
        addRow(layout, row, gameCallbacks, elems);
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
