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

const layouts = {
    standard: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ],

    fiveASide: [
        ['r', 'n', 'b', 'q', 'k'],
        ['p', 'p', 'p', 'p', 'p'],
        [null, null, null, null, null],
        [null, null, null, null, null],
        ['P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K'],
    ]
}

const defaultLayoutName = 'standard';
const defaultTopLeftBlack = false;


function PermanentPieces({ corePieces, gameOptions }) {
    return (
        <div className='permanent-pieces'>
            {corePieces.map(
                (cp, index) => (
                    <SimpleSquare key={index}>
                        <Piece corePiece={cp} gameOptions={gameOptions} />
                    </SimpleSquare>
                )
            )}   
        </div>
    ); 
}

function makeBoardState(layoutName, cpf) {
    const layout = layouts[layoutName];
    if(!layout) {
        throw new Error(`Unrecognised board layout name: ${layoutName}`);
    }
    const pieces = layout.map(row => row.map(
        name => cpf.make(name)
    ));

    return {
        layoutName: layoutName,
        boardLayout: new BoardLayout(pieces, defaultTopLeftBlack),
    };
}

class Game extends React.Component {

    constructor() {
        super();

        let cpf = new CorePieceFactory();
        this._corePieceFactory = cpf;

        this.state = makeBoardState(defaultLayoutName, cpf);

        this.state.OffBoardCorePieces = {
            black: blackPieceNames.map(name => cpf.make(name)),
            white: whitePieceNames.map(name => cpf.make(name)),
        };
    }

    boardLayout(layoutName) {

        if(layoutName !== undefined) {
            this.setState(makeBoardState(layoutName, this._corePieceFactory));
        }
        return this.state.layoutName;
    }

    clear() {
        this.setState({
            boardLayout: this.state.boardLayout.copy().clearSquares()
        });
    }

    flip() {
        this.setState({
            boardLayout: this.state.boardLayout.copy().reserveRows(),
            OffBoardCorePieces: {
                black: this.state.OffBoardCorePieces.white,
                white: this.state.OffBoardCorePieces.black,
            }
        });
    }

    restart() {
       this.boardLayout(this.state.layoutName);
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
            let nbp = this.state.OffBoardCorePieces.white.find(p => p.id === pieceId);
            if(!nbp)
                nbp = this.state.OffBoardCorePieces.black.find(p => p.id === pieceId);

            if (!nbp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }

            const copiedPiece = this._corePieceFactory.make(nbp); 
            newBoardLayout.corePiece(row,col, copiedPiece)
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
                        corePieces={this.state.OffBoardCorePieces.black}
                        gameOptions={this}
                    />

                    <Board
                        layout={this.state.boardLayout}
                        gameOptions={this}
                    />

                    <PermanentPieces
                        corePieces={this.state.OffBoardCorePieces.white}
                        gameOptions={this}
                    />
                </div>
            </DndProvider>
        )
    }

    render() {

        return (
            <>
            {this.renderMainGame()}
            <GameControl gameOptions={this}/>
            </>

        )
    }
}

export { Game }
