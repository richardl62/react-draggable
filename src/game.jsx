// Information about games that is indepantant of rendering */

import { boardLayout } from './board_layout';
import { makeCorePiece } from './pieces';
let observer = null;


function setObserver(o) {
    if (observer) {
        throw new Error("Multiple observers not supported");
    }

    observer = o;
    observer(boardLayout);
}

function knightMove(toRow, toCol) {
    boardLayout.piece(toRow, toCol, makeCorePiece('knight'))
    observer(boardLayout);
}

export { setObserver, knightMove }