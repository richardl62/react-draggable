import React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Piece } from './pieces';
import { processSquareClick, knightMove } from './game';
import { Square } from './Square';
import { itemTypes } from './constants'

function BoardSquare({ layout, pieces, row, col }) {
    const [, drop] = useDrop({
        accept: itemTypes.KNIGHT,
        drop: () => knightMove(row, col),
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
            <Square
                black={layout.squareIsBlack(row, col)}
                onClick={() => processSquareClick(row, col)}
            >
                <Piece type={pieces.pieceType(row, col)} />
            </Square>
            
        </div> 
        
    );
}

function Board({layout, pieces}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let squares = [];
    for (let row = 0; row < nRows; ++row) {
        for (let col = 0; col < nCols; ++col) {
            squares.push(
                <BoardSquare 
                    index={squares.length} 
                    key={[row, col]} 
                    layout={layout}
                    pieces={pieces}
                    row={row}
                    col={col}
                />
            );
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

export { Board }