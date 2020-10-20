import { CorePiece } from "./pieces";


const standardLayout = [
    ['bC', 'bK', 'bB', 'bQ', 'bK', 'bB', 'bK', 'bC'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wC', 'wK', 'wB', 'wQ', 'wK', 'wB', 'wK', 'wC'],
];

class BoardLayout {

    constructor() {
        this._corePieces = standardLayout.map(subArray => subArray.map(
            name => (name ? new CorePiece({name:name, dragBehaviour:'move'}) : null)
        ));
        this._topLeftBlack = false;

        Object.seal(this);
    }

    get nRows() {return this._corePieces.length;}
    get nCols() {return this._corePieces[0].length;}

    // Get or set the core piece at the specified square. Null represents an emoty square.
    corePiece(row, col) {
        if(this._corePieces[row][col] === undefined) {
            throw new Error(`Invalid row or column number: ${row} ${col}`)
        }

        return this._corePieces[row][col];
    }

    movePiece(id, row, col) {
        
        if(this._corePieces[row][col] === undefined) {
            throw new Error(`Invalid row or column number: ${row} ${col}`)
        }

        const from = this.findCorePiecebyId(id);

        if(this._corePieces[row][col] !== from.piece) {
            this._corePieces[row][col] = from.piece;
            if(!from.piece.copyWhenDragged) {
                this._corePieces[from.row][from.col]  = null;
            }
        }
    }

    isBlack(row, col) {
        const asTopLeft = (row + col) % 2 === 0;
        return asTopLeft ? this._topLeftBlack : !this._topLeftBlack;
    }

   findCorePiecebyId(id) {
        for(let row = 0; row < this.nRows; ++row) {
            for(let col = 0; col < this.nCols; ++col) {
                const cp = this._corePieces[row][col];
                if(cp && cp.id === id) {
                    return {row:row, col:col, piece:cp};
                }
            }
        }
    
        throw new Error(`Cannot find piece to move: ${id}`);
    }
}


let boardLayout = new BoardLayout();
export {boardLayout};