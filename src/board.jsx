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

function Header({nCols}) {
    let labels = [];

    for(let col=1; col <= nCols; ++col) {
        labels.push(<div className='label' key={'col'+col}>{col}</div>)
    }

    return (<div className="board-label">
        <div></div>
        {labels}
        <div></div>
    </div>);
}

function Row({ layout, row, movePiece }) {

    let squares = [];

    for (let col = 0; col < layout.nCols; ++col) {
        squares.push(
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

    return <div className='board-row'>
        <div className='label'>{row}</div>
        {squares}
        <div className='label'>{row}</div>
    </div>
}

function Board({layout, movePiece}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let rows = [];
    for (let row = 0; row < nRows; ++row) {
        rows.push(
            <Row
                key={'row'+row}
                layout={layout}
                row={row}
                movePiece={movePiece}
            />
        );
    }

    return (
        <div className="board">
            <Header key='h1' nCols={nCols} />
            {rows}
            <Header key='h2' nCols={nCols} />
        </div>
    )

}

export { Board }
