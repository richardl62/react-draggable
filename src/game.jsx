// Information about games that is indepantant of rendering */

import React from 'react';
import { BoardLayout } from './board_layout';
import { Board } from './board';
import { whitePieceNames, blackPieceNames, Piece, CorePiece } from './pieces';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function makeCopyOnDragPiece(name, index) {
    const cp = new CorePiece({name:name, dragBehaviour:'copy'});
    return (<Piece index={index} key={cp.id} corePiece={cp} />);
}

class Game extends React.Component {

    constructor() {
        super();

        this.state = {boardLayout: new BoardLayout()}
    }

    movePiece = (piece, row, col) => {
        let newBoardLayout = new BoardLayout(this.state.boardLayout);
        newBoardLayout.movePiece(piece, row, col);
        
        this.setState({
            boardLayout: newBoardLayout,
        })
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="chess-game">
                    <div class="permanentPieces"> 
                         {blackPieceNames.map(makeCopyOnDragPiece)} 
                    </div>

                    <Board
                        layout={this.state.boardLayout}
                        movePiece={this.movePiece}
                    />

                    <div class="permanentPieces">
                        {whitePieceNames.map(makeCopyOnDragPiece)}
                    </div>
                </div>
            </DndProvider>
        )
    }
}



export { Game }
