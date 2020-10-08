import React from 'react';

export function Square({ black, children, onClick }) {
    const className = 'square' + (black ? ' blackSquare' : '');
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
}
