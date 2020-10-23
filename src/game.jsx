// Information about games that is indepantant of rendering */

import React from 'react';
import { BoardLayout } from './board_layout';
import { Board } from './board';
import { blackPieceNames, whitePieceNames, Piece } from './pieces';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CorePieceFactory } from "./pieces";


let standardLayout = [
    [ 'r',  'n',  'b',  'q',  'k',  'b',  'n',  'r'],
    [ 'p',  'p',  'p',  'p',  'p',  'p',  'p',  'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [ 'P',  'P',  'P',  'P',  'P',  'P',  'P',  'P'],
    [ 'R',  'N',  'B',  'Q',  'K',  'B',  'N',  'R'],
];
standardLayout.topLeftBlack=false;
Object.freeze(standardLayout);

function PermanentPieces({ corePieces }) {
    return (
        <div className="permanentPieces">
            {corePieces.map(
                (cp, index) => (
                    <div>
                        <Piece corePiece={cp} index={index} key={cp.id} />
                    </div>
                )
            )}   
        </div>
    ); 
}

function makeBoard(layout, corePieceFactory) {

    const pieces = layout.map(row => row.map(
        name => corePieceFactory.make(name)
    ));

    return new BoardLayout(pieces, layout.topLeftBlack)
}


class Game extends React.Component {

    constructor() {
        super();

        let cpf = new CorePieceFactory();
        this._corePieceFactory = cpf;

        this.state = {
            boardLayout: makeBoard(standardLayout, cpf),
        }

        const bcp = blackPieceNames.map(name => cpf.make(name));
        const wcp = whitePieceNames.map(name => cpf.make(name));

           
        this._OffBoardCorePieces = {
            black: bcp,
            white: wcp,
            all: bcp.concat(wcp),
        };
        Object.freeze(this._OffBoardCorePieces);
    }

    copyPiece(piece) {
        return this._corePieceFactory.make(piece); 
    }

    movePiece = (pieceId, row, col) => {

        let newBoardLayout = this.state.boardLayout.copy();
        const bp = newBoardLayout.findCorePiecebyId(pieceId);
        if ( bp ) {
            if (row !== bp.row || col !== bp.col) {
                newBoardLayout.corePiece(row, col, bp.piece);
                newBoardLayout.corePiece(bp.row, bp.col, null);
            }
        } else {
            const nbp = this._OffBoardCorePieces.all.find(p => p.id === pieceId);
            if (!nbp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }
            newBoardLayout.corePiece(row,col, this.copyPiece(nbp))
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
                        corePieces={this._OffBoardCorePieces.black}     
                    />

                    <Board
                        layout={this.state.boardLayout}
                        movePiece={this.movePiece}
                    />

                    <PermanentPieces 
                        corePieces={this._OffBoardCorePieces.white}     
                    />

                </div>
            </DndProvider>
        )
    }
}



export { Game }
