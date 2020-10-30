// Information about games that is indepantant of rendering */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardLayout } from './board_layout';
import { Board } from './board';
import { SimpleSquare } from './square'
import {  CorePieceFactory, Piece } from './pieces';
import  GameControl from './game_control';
import  startingLayouts from './starting_layouts';
import  {defaultLayoutName} from './starting_layouts';


function RowOfPieces({ corePieces, gameOptions }) {
    return (
        <div className='row-of-pieces'>
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

function makeBoardState(name, cpf) {

    const makeCorePiece = name => cpf.make(name);

    const layout = startingLayouts[name];
    if(!layout) {
        throw new Error(`Unrecognised layout name: ${name}`)
    }
    
    const pieces = layout.board.map(row => row.map(makeCorePiece));

    return {
        copyablePiecesTop: layout.copyableTop.map(makeCorePiece),
        boardLayout: new BoardLayout(pieces, layout.topLeftBlack),
        copyablePiecesBottom: layout.copyableBottom.map(makeCorePiece),
        layoutName: name,
    };
}

class Game extends React.Component {

    constructor() {
        super();

        let cpf = new CorePieceFactory();
        this._corePieceFactory = cpf;

        this.state = makeBoardState(defaultLayoutName, cpf);
        this.state.numberRowsFromTop = false;
    }

    get numberRowsFromTop() {
        return this.state.numberRowsFromTop;
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
            copyablePiecesTop: this.state.copyablePiecesBottom,
            copyablePiecesBottom: this.state.copyablePiecesTop,
            
            numberRowsFromTop: !this.state.numberRowsFromTop,
        });
    }

    restart() {
        this.setState(makeBoardState(this.state.layoutName, this._corePieceFactory));
    }

    _findOffBoardPiece(pieceId) {
        let piece = this.state.copyablePiecesTop.find(p => p.id === pieceId);
        if(!piece) {
            piece = this.state.copyablePiecesBottom.find(p => p.id === pieceId);
        }

        return piece;
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
            let obp = this._findOffBoardPiece(pieceId);

            if (!obp) {
                throw new Error(`Piece with id ${pieceId} not found`);
            }

            const copiedPiece = this._corePieceFactory.make(obp); 
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

                    <RowOfPieces
                        corePieces={this.state.copyablePiecesTop}
                        gameOptions={this}
                    />

                    <Board
                        layout={this.state.boardLayout}
                        gameOptions={this}
                    />

                    <RowOfPieces
                        corePieces={this.state.copyablePiecesBottom}
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
