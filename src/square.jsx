import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from './constants';
import { Piece } from './pieces';

class SimpleSquare extends React.PureComponent {
    render() {
        let { black, children } = this.props;

        const className = 'square ' + (black ? 'black-square' : 'white-square');
        return (
            <div className={className}>
                {children}
            </div>
        );
    }
}

function BoardSquare({ corePiece, movePiece, isBlack, row, col }) {
    const [, drop] = useDrop({
        accept: itemTypes.PIECE,
        drop: item => movePiece(item.id, row, col),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })
    return (
        <div ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <SimpleSquare black={isBlack}>
                {corePiece ? <Piece corePiece={corePiece} /> : null}
            </SimpleSquare>

        </div>

    );
}

export default BoardSquare;