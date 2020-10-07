import './game.css';

let observer = null;
let  knightPosition = [0,0];

function setObserver(o) {
    if(observer) {
        throw new Error("Multiple observers not supported");
    }
    
    observer = o;
    observer(knightPosition)
}

function knightMove(toRow, toCol) {
    knightPosition = [toRow, toCol];
    observer(knightPosition)
}


function processSquareClick(row, col) {
    const rowDelta = Math.abs(row - knightPosition[0]);
    const colDelta = Math.abs(col - knightPosition[1]);

    if((rowDelta === 1 && colDelta === 2) || (rowDelta === 2 && colDelta === 1) )
    {
        knightMove(row,col);
    }
}

export { setObserver, processSquareClick }