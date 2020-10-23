// Information about games that is indepantant of rendering */

import React from 'react';
import { BoardLayout } from './board_layout';
import { Board } from './board';
import { blackPieceNames, whitePieceNames, Piece, CorePiece } from './pieces';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function PermanentPieces({ corePieces }) {
    return (
        <div className="permanentPieces">
            {corePieces.map(
                (cp, index) => <Piece corePiece={cp} index={index} key={cp.id} />
            )}   
        </div>
    ); 
}

class Game extends React.Component {

    constructor() {
        super();

        this.state = {boardLayout: new BoardLayout()}

        function makeCorePiece(name) {
            return new CorePiece({name:name});
        }

        const bcod = blackPieceNames.map(makeCorePiece);
        const wcod = whitePieceNames.map(makeCorePiece);
           
        this._CopyOnDragPieces = {
            black: bcod,
            white: wcod,
            all: bcod.concat(wcod),
        };
    }

    movePiece = (pieceId, row, col) => {

        let newBoardLayout = new BoardLayout(this.state.boardLayout);
        const bp = newBoardLayout.findCorePiecebyId(pieceId);
        if ( bp ) {
            if (row !== bp.row || col !== bp.col) {
                newBoardLayout.corePiece(row, col, bp.piece);
                newBoardLayout.corePiece(bp.row, bp.col, null);
            }
        } else {
            const nbp = this._CopyOnDragPieces.all.find(p => p.id === pieceId);
            if (!nbp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }
            newBoardLayout.corePiece(row,col, new CorePiece({ name: nbp.name }))
        }

        this.setState({
            boardLayout: newBoardLayout,
        })
    }

    render() {

        return (
            <DndProvider backend={HTML5Backend}>
                <div className="chess-game">

                    <PermanentPieces 
                        corePieces={this._CopyOnDragPieces.black}     
                    />

                    <Board
                        layout={this.state.boardLayout}
                        movePiece={this.movePiece}
                    />

                    <PermanentPieces 
                        corePieces={this._CopyOnDragPieces.white}     
                    />

                </div>
            </DndProvider>
        )
    }
}



export { Game }
