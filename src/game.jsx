// Information about games that is indepantant of rendering */

import { boardLayout } from './board_layout';
let observer = null;


function setObserver(o) {
    if (observer) {
        throw new Error("Multiple observers not supported");
    }

    observer = o;
    observer(boardLayout);
}

function movePiece(id, toRow, toCol) {
    boardLayout.movePiece(id, toRow, toCol);
    observer(boardLayout);
}

export { setObserver, movePiece }