import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Piece } from './pieces';
import { processSquareClick } from './game';
import { Square } from './Square';

import './game.css';


function Board({layout, pieces}) {
    const nRows = layout.nRows;
    const nCols = layout.nCols;

    let squares = [];
    for (let row = 0; row < nRows; ++row) {
        for (let col = 0; col < nCols; ++col) {
            squares.push(
                <Square 
                    index={squares.length} 
                    key={[row, col]} 
                    black={layout.squareIsBlack(row, col)}
                    onClick={() => processSquareClick(row, col)}
                    >
                    <Piece type={pieces.pieceType(row, col)} />
                </Square>
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