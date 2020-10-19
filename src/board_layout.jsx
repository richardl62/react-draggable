import { makeCorePiece } from "./pieces";

const k = ()=>makeCorePiece('knight');

const pieces = [
    [k(),  null, null, k() ],
    [null, null, null, null],
];
const topLeftBlack = false;

console.log(pieces);
debugger;
class BoardLayout {
    get nRows() {return pieces.length;}
    get nCols() {return pieces[0].length;}

    // Get or set the core piece at the specified square. Null represents an emoty square.
    piece(row, col, newPiece) {
        if(pieces[row][col] === undefined) {
            throw new Error(`Invalid row or column number: ${row} ${col}`)
        }

        if(newPiece !== undefined) {
            pieces[row][col] = newPiece;
        }
        
        return pieces[row][col];
    }

    isBlack(row, col) {
        const asTopLeft = (row + col) % 2 === 0;
        return asTopLeft ? topLeftBlack : !topLeftBlack;
    }
}

let boardLayout = new BoardLayout();
export {boardLayout};