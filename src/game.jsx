// Information about games that is indepantant of rendering */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardLayout } from './board_layout';
import { Board } from './board';
import { SimpleSquare } from './square'
import { blackPieceNames, whitePieceNames, Piece } from './pieces';
import  GameControl from './game_control';


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

function PermanentPieces({ corePieces, gameCallbacks }) {
    return (
        <div className='permanent-pieces'>
            {corePieces.map(
                (cp, index) => (
                    <SimpleSquare key={index}>
                        <Piece corePiece={cp} gameCallbacks={gameCallbacks} />
                    </SimpleSquare>
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

        this._callbacks = {
            movePiece: (...args) => this.movePiece(...args),
            dragEnd: (...args) => this.dragEnd(...args),
            dragStart: (...args) => this.dragStart(...args),
            dragBehaviour: (...args) => this.dragBehaviour(...args),
        };

        Object.freeze(this._OffBoardCorePieces);
    }

    copyPiece(piece) {
        return this._corePieceFactory.make(piece); 
    }

    movePiece(pieceId, row, col)  {

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

    dragEnd(pieceId, dropped) {
        if (!dropped) {
            // The piece was dragged off the board. Now clear it.
            const bp = this.state.boardLayout.findCorePiecebyId(pieceId);
            if (bp) {
                let newBoardLayout = this.state.boardLayout.copy();
                newBoardLayout.corePiece(bp.row, bp.col, null);
                
                this.setState({
                    boardLayout: newBoardLayout,
                })
            }
        }
    }

    dragStart(pieceId) {
        // console.log("Starting drag:", pieceId);
    }

    dragBehaviour(pieceId) {
        const onBoard = Boolean(this.state.boardLayout.findCorePiecebyId(pieceId));
    
        return {
            move: onBoard,
            copy: !onBoard,
        };
    }

    renderMainGame() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="game">

                    <PermanentPieces
                        corePieces={this._OffBoardCorePieces.black}
                        gameCallbacks={this._callbacks}
                    />

                    <Board
                        layout={this.state.boardLayout}
                        gameCallbacks={this._callbacks}
                    />

                    <PermanentPieces
                        corePieces={this._OffBoardCorePieces.white}
                        gameCallbacks={this._callbacks}
                    />
                </div>
            </DndProvider>
        )
    }

    render() {

        return (
            <>
            {this.renderMainGame()}
            <GameControl />
            </>

        )
    }
}

export { Game }
