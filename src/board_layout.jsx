class BoardLayout {

    // Input is of form show below.  Each element is CorePiece or null.
    // [
    //     [r0c0, r0c1. ...],
    //     [r1c0, r1c1. ...], 
    //     ...
    // ]
    constructor(corePieces, topLeftBlack) {
        if(!(corePieces instanceof Array && typeof topLeftBlack === "boolean")) {
            throw new Error("Bad input to BoardLayout");
        }
        this._corePieces = corePieces;
        this._topLeftBlack = topLeftBlack;
        Object.seal(this);
    }

    copy() {
        return new BoardLayout(
            this._corePieces.map(row => [...row]), 
            this._topLeftBlack
        );
    }

    get nRows() {return this._corePieces.length;}
    get nCols() {return this._corePieces[0].length;}

    // Get or set the core piece at the specified square. Null represents an emoty square.
    corePiece(row, col, newPiece) {
        if(this._corePieces[row][col] === undefined) {
            throw new Error(`Invalid row or column number: ${row} ${col}`)
        }

        if(newPiece !== undefined) {
            this._corePieces[row][col] = newPiece; 
        }

        return this._corePieces[row][col];
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
    
        return null;
    }
}

export {BoardLayout};