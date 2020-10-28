import React from 'react';

function GameControl({gameOptions}) {
    return (
        <div className="game-control" >
            <div className="game-type">
                <label>
                    <input type="radio" name="game-type"
                        onClick={gameOptions.boardLayout('standard')}   
                    />
                    Standard
                </label>
                <label>
                    <input type="radio" name="game-type"
                        onClick={gameOptions.boardLayout('fiveASide')}   
                    />
                    5-a-side
                </label>
            </div>

            <div className='buttons'>
                <button type='button'>Restart</button>
                <button type='button'>Clear</button>
                <button type='button'>Flip</button>
            </div>
        </div>
    );
}

export default GameControl;