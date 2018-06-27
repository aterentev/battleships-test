import * as CONST from '../const';

export class Utils {
    static IRotation = 0;
    static LRotation = 0;
    static board = [[0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]];

    static placeShip(board, ship): number[][] {
        ship.forEach(([col,row]) => {
            Utils.board[row][col] = CONST.TYPES.SHIP;
            board[row][col] = CONST.TYPES.SHIP;
            for (let i = -1; i < 2; i++) {
                if ((row === 0 && i === -1) || (row === 9 && i === 1)) continue;
                for (let k = -1; k < 2; k++) {
                    if ((col === 0 && k === -1) || (col === 9 && k === 1) || (board[row + i][col + k] !== 0)) continue;
                    Utils.board[row + i][col + k] = CONST.TYPES.OCCUPIED;
                    board[row + i][col + k] = CONST.TYPES.OCCUPIED;
                }
            }
        });
        return board;
    }

    static onHover(type: number | null, row: number, col: number): any {
        let cellType = CONST.TYPES.SHIP;
        let ship = [];
        switch (type) {
            case 1:
                if (Utils.LRotation === 0) {
                    if (col > 8 || row > 7) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, (row + 1), col) ||
                        Utils.checkPosition(Utils.board, (row + 2), col) ||
                        Utils.checkPosition(Utils.board, (row + 2), (col + 1))) {
                        cellType = CONST.TYPES.HIT;
                    }
                    Utils.board[row][col] = cellType;
                    Utils.board[row + 1][col] = cellType;
                    Utils.board[row + 2][col] = cellType;
                    Utils.board[row + 2][col + 1] = cellType;
                    ship = [[col,row], [col,row + 1], [col,row + 2], [col + 1,row + 2]];
                } else if (Utils.LRotation === 1) {
                    if (col < 2 || row > 8) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, (row), (col - 1)) ||
                        Utils.checkPosition(Utils.board, (row), (col - 2)) ||
                        Utils.checkPosition(Utils.board, (row + 1), (col - 2))) {
                        cellType = CONST.TYPES.HIT;
                    }
                    Utils.board[row][col] = cellType;
                    Utils.board[row][col - 1] = cellType;
                    Utils.board[row][col - 2] = cellType;
                    Utils.board[row + 1][col - 2] = cellType;
                    ship = [[col,row], [col - 1,row], [col - 2,row], [col - 2,row + 1]];
                } else if (Utils.LRotation === 2) {
                    if (col < 1 || row < 2) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, (row - 1), (col)) ||
                        Utils.checkPosition(Utils.board, (row - 2), (col)) ||
                        Utils.checkPosition(Utils.board, (row - 2), (col - 1))) {
                        cellType = CONST.TYPES.HIT;
                    }
                    Utils.board[row][col] = cellType;
                    Utils.board[row - 1][col] = cellType;
                    Utils.board[row - 2][col] = cellType;
                    Utils.board[row - 2][col - 1] = cellType;
                    ship = [[col,row], [col,row - 1], [col,row - 2], [col - 1,row - 2]];
                } else {
                    if (col > 7 || row < 1) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, row, (col + 1)) ||
                        Utils.checkPosition(Utils.board, row, (col + 2)) ||
                        Utils.checkPosition(Utils.board, (row - 1), (col + 2))) {
                        cellType = CONST.TYPES.HIT;
                    }
                    Utils.board[row][col] = cellType;
                    Utils.board[row][col + 1] = cellType;
                    Utils.board[row][col + 2] = cellType;
                    Utils.board[row - 1][col + 2] = cellType;
                    ship = [[col,row], [col + 1,row], [col + 2,row], [col + 2,row - 1]];
                }
                break;
            case 2:
                if (Utils.IRotation === 1) {
                    if (col > 6) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, row, (col + 1)) ||
                        Utils.checkPosition(Utils.board, row, (col + 2)) ||
                        Utils.checkPosition(Utils.board, row, (col + 3))) cellType = CONST.TYPES.HIT;
                    for (let i = 0; i < 4; i++) {
                        Utils.board[row][col + i] = cellType;
                    }
                    ship = [[col, row], [col + 1, row], [col + 2, row], [col + 3, row]];
                    break;
                } else {
                    if (row > 6) break;
                    if (Utils.checkPosition(Utils.board, row, col) ||
                        Utils.checkPosition(Utils.board, (row + 1), col) ||
                        Utils.checkPosition(Utils.board, (row + 2), col) ||
                        Utils.checkPosition(Utils.board, (row + 3), col)) cellType = CONST.TYPES.HIT;
                    for (let i = 0; i < 4; i++) {
                        Utils.board[row + i][col] = cellType;
                    }
                    ship = [[col,row], [col,row + 1], [col,row + 2], [col,row + 3]];
                    break;
                }
            case 3:
            case 4:
                if (Utils.checkPosition(Utils.board, row, col)) {
                    cellType = CONST.TYPES.HIT;
                }
                Utils.board[row][col] = cellType;
                ship = [[col, row]];
                break;
        }

        return { board: Utils.board, ship };
    }

    static onBlur(board, type: number | null, row: number, col: number): number[][] {
        switch (type) {
            case 1:
                if (Utils.LRotation === 0) {
                    if (col > 8 || row > 7) break;
                    Utils.board[row][col] = board[row][col];
                    Utils.board[row + 1][col] = board[row + 1][col];
                    Utils.board[row + 2][col] = board[row + 2][col];
                    Utils.board[row + 2][col + 1] = board[row + 2][col + 1];
                } else if (Utils.LRotation === 1) {
                    if (col < 2 || row > 8) break;
                    Utils.board[row][col] = board[row][col];
                    Utils.board[row][col - 1] = board[row][col - 1];
                    Utils.board[row][col - 2] = board[row][col - 2];
                    Utils.board[row + 1][col - 2] = board[row + 1][col - 2];
                } else if (Utils.LRotation === 2) {
                    if (col < 1 || row < 2) break;
                    Utils.board[row][col] = board[row][col];
                    Utils.board[row - 1][col] = board[row - 1][col];
                    Utils.board[row - 2][col] = board[row - 2][col];
                    Utils.board[row - 2][col - 1] = board[row - 2][col - 1];
                } else {
                    if (col > 7 || row < 1) break;
                    Utils.board[row][col] = board[row][col];
                    Utils.board[row][col + 1] = board[row][col + 1];
                    Utils.board[row][col + 2] = board[row][col + 2];
                    Utils.board[row - 1][col + 2] = board[row - 1][col + 2];
                }
                return board;
            case 2:
                if (Utils.IRotation === 1) {
                    if (col > 6) break;
                    for (let i = 0; i < 4; i++) {
                        Utils.board[row][col + i] = board[row][col + i];
                    }
                } else {
                    if (row > 6) break;
                    for (let i = 0; i < 4; i++) {
                        Utils.board[row + i][col] = board[row + i][col];
                    }
                }
                return board;
            case 3:
            case 4:
                Utils.board[row][col] = board[row][col];
                return board;
        }
        return board;
    }

    static checkPosition(board, row: number, col: number): boolean {
        return (board[row][col] === 1 || board[row][col] === 9);
    }
}
