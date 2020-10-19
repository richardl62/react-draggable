import React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { itemTypes } from './constants';
import { Piece } from './pieces';
import { knightMove } from './game';
import { Square } from './Square';

function BoardSquare({ corePiece, isBlack, row, col }) {
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
            <Square black={isBlack}>
                <Piece corePiece={corePiece} />
            </Square>
            
        </div> 
        
    );
}

function Board({layout}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let squares = [];
    for (let row = 0; row < nRows; ++row) {
        for (let col = 0; col < nCols; ++col) {
            squares.push(
                <BoardSquare 
                    index={squares.length} 
                    key={[row, col]} 
                    isBlack={layout.isBlack(row, col)}
                    corePiece={layout.piece(row, col)}
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
        <DndProvider backend={HTML5Backend}>
            <div className="board" style={style}>
                {squares}
            </div>
        </DndProvider>
    );
}

export { Board }