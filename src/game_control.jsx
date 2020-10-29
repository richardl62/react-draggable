import React from 'react';

function GameControl({gameOptions}) {

    const currentLayout = gameOptions.boardLayout();

    return (
        <div className="game-control" >
            <div className="game-type">
                <label>
                    <input type="radio" name="game-type"
                        onChange={()=>gameOptions.boardLayout('standard')} 
                        checked={currentLayout === 'standard'}
                    />
                    Standard
                </label>
                <label>
                    <input type="radio" name="game-type"
                        onChange={()=>gameOptions.boardLayout('fiveASide')}
                        checked={currentLayout === 'fiveASide'}  
                    />
                    5-a-side
                </label>
            </div>

            <div className='buttons'>
                <button type='button' onClick={()=>gameOptions.restart()}>Restart</button>
                <button type='button' onClick={()=>gameOptions.clear()}> Clear</button>
                <button type='button' onClick={()=>gameOptions.flip()}>Flip</button>
            </div>
        </div>
    );
}

export default GameControl;