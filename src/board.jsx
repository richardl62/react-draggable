import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from './constants';
import { Piece } from './pieces';
import { Square } from './Square';

function BoardSquare({ corePiece, movePiece, isBlack, row, col }) {
    const [, drop] = useDrop({
        accept: itemTypes.PIECE,
        drop: item => movePiece(item.id, row, col),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    return (
        <div ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Square black={isBlack}>
                {corePiece ? <Piece corePiece={corePiece} /> : null }
            </Square>
            
        </div> 
        
    );
}

function addHeader(nCols, elems) {
    elems.push(<div />);
    for(let col=1; col <= nCols; ++col) {
        elems.push(<div className='column-number' key={'col'+col}>{col}</div>)
    }
    elems.push(<div />);
}

function addRow(layout, row, movePiece, elems) {

    const letter = String.fromCharCode(65+row);

    elems.push(<div className='row-letter'>{letter}</div>);
    
    for (let col = 0; col < layout.nCols; ++col) {
        elems.push(
            <BoardSquare
                index={col}
                key={col}

                corePiece={layout.corePiece(row, col)}
                movePiece={movePiece}
                isBlack={layout.isBlack(row, col)}

                row={row}
                col={col}
            />
        );
    }

    elems.push(<div className='row-letter'>{letter}</div>);
}

function Board({layout, movePiece}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let elems = [];

    addHeader(nCols,elems);
    for (let row = 0; row < nRows; ++row) {
        addRow(layout, row, movePiece, elems);
    }
    addHeader(nCols,elems);

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
