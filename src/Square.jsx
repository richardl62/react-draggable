import React from 'react';

class Square extends React.PureComponent {

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

export { Square }