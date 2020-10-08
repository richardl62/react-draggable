// Information about games that is indepantant of rendering */

import { itemTypes } from './constants';

const boardLayout = {
    nRows: 4,
    nCols: 6,
    topLeftBlack: false,

    squareIsBlack(row, col) {
        const sameColorTopleft = (row + col) % 2 === 0;
        return this.topLeftBlack ? sameColorTopleft : !sameColorTopleft;
    }
};

let pieces = {
    knightPosition: [0, 0],

    pieceType(row, col) {
        if ((row === this.knightPosition[0]) && (col === this.knightPosition[1])) {
            return itemTypes.KNIGHT;
        }

        return null;
    }
};

let observer = null;


function setObserver(o) {
    if(observer) {
        throw new Error("Multiple observers not supported");
    }
    
    observer = o;
    observer(pieces);
}

function knightMove(toRow, toCol) {
    pieces.knightPosition = [toRow, toCol];
    observer(pieces);
}


function processSquareClick(row, col) {
    const rowDelta = Math.abs(row - pieces.knightPosition[0]);
    const colDelta = Math.abs(col - pieces.knightPosition[1]);

    if((rowDelta === 1 && colDelta === 2) || (rowDelta === 2 && colDelta === 1) )
    {
        knightMove(row,col);
    }
}

export { setObserver, boardLayout, processSquareClick}