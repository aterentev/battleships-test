//import update from 'react-addons-update';

export default (function () {
    const types = Object.freeze({
        HIT: 3,
        SHIP: 2,
        MISS: 1,
        EMPTY: 0
    });

    function boardWithShips(ships) {
        let board = [[0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,0,0]];
        // let board = new Array(10);
        //
        // board.map(() => new Array(10));

        _shipsToCoords(ships).forEach(([row, col]) => {
            board[row][col] = types.SHIP;
        });

        return board;
    }

    function onFire(board, row, col) {
        let newBoard = board;
        switch(board[row][col]) {
            case types.EMPTY:
                //newBoard = update(board, { [row]: { [col]: { $set: types.MISS}}});
                break;
            case types.SHIP:
                //newBoard = update(board, { [row]: { [col]: { $set: types.HIT}}});
                break;
            case types.HIT:
            case types.MISS:
                break;
        }
        return newBoard;
    }

    function _shipsToCoords (ships) {
        let coords = [];
        ships.forEach((row, col) => {
            if (row === -1) { return; }
            coords.push([row, col]);
            coords.push([row + 1, col]);
            coords.push([row + 2, col]);
        });
        return coords;
    }

    function isWinner (board, ships) {
        let isWin = true;
        _shipsToCoords(ships).forEach(([row, col]) => {
            if (board[row][col] !== this.types.HIT) {
                isWin = false;
            }
        });
        return isWin;
    }

    return {
        types: types,
        boardWithShips: boardWithShips,
        onFire: onFire,
        isWinner: isWinner
    };
})();
