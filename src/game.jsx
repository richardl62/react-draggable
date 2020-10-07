import './game.css';

let count = 0;
function observe(config, receive) {
    const {nRows, nCols} = config;
    const getPos = () => {
        const pos = [
            Math.floor(count/nCols) % nRows,
            count % nCols,
        ];
        console.log(count, pos);
        ++count; 
        return pos;
    }

    setInterval(() => receive(getPos()), 500);

}

export { observe }