const layouts = {
    standard: {
        copyableTop: ['p', 'n',  'b',  'r',  'q',  'k'],

        board: [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ],
        topLeftBlack: true,

        copyableBottom: ['P', 'N',  'B',  'R',  'Q',  'K' ],

        displayName: 'Standard',
    },

    fiveASide: {
        copyableTop: ['p', 'n',  'b',  'r',  'q',  'k'],

        board: [
            ['r', 'n', 'b', 'q', 'k'],
            ['p', 'p', 'p', 'p', 'p'],
            [null, null, null, null, null],
            [null, null, null, null, null],
            ['P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K'],
        ],
        topLeftBlack: true,

        copyableBottom: ['P', 'N',  'B',  'R',  'Q',  'K' ],

        displayName: '5-a-side',
    },
};

const defaultLayoutName = 'standard';

export default layouts;
export {defaultLayoutName};
