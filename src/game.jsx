// Information about games that is indepantant of rendering */

import React from 'react';
import { BoardLayout } from './board_layout';
import { Board } from './board';



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
        return (<Board 
            layout={this.state.boardLayout}
            movePiece={this.movePiece}
         />);
    }
}



export { Game }