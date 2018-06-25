import * as CONST from '../const';

export class Utils {
    public static boardWithShips(): number[][] {
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

        board = this.placeShip(board, this.initIShip());
        board = this.placeShip(board, this.initLShip(board.slice(0, board.length)));
        board = this.placeShip(board, this.initDotShip(board.slice(0, board.length)));
        board = this.placeShip(board, this.initDotShip(board.slice(0, board.length)));

        return board;
    }

    static placeShip(board, ship): number[][] {
        ship.forEach(([col,row]) => {
            board[row][col] = CONST.TYPES.SHIP;
            for (let i = -1; i < 2; i++) {
                if ((row === 0 && i === -1) || (row === 9 && i === 1)) continue;
                for (let k = -1; k < 2; k++) {
                    if ((col === 0 && k === -1) || (col === 9 && k === 1) || (board[row + i][col + k] !== 0)) continue;
                    board[row + i][col + k] = CONST.TYPES.OCCUPIED;
                }
            }
        });
        return board;
    }

    static initDotShip(board): number[][] {
        let col = Math.floor(Math.random() * 9);
        let row = Math.floor(Math.random() * 9);

        while (Utils.checkPosition(board, row, col)) {
            col = Math.floor(Math.random() * 9);
            row = Math.floor(Math.random() * 9);
        }
        return [[col,row]];
    }

    static initIShip(): number[][] {
        let rotation = Math.floor(Math.random() * 2);
        let ship = [];

        if (rotation === 1) {
            let col = Math.floor(Math.random() * 6);
            let row = Math.floor(Math.random() * 8);

            ship = [[col, row], [col + 1, row], [col + 2, row], [col + 3, row]];
        } else {
            let col = Math.floor(Math.random() * 8);
            let row = Math.floor(Math.random() * 6);

            ship = [[col,row], [col,row + 1], [col,row + 2], [col,row + 3]];
        }
        return ship;
    }

    static initLShip(board): number[][] {
        let rotation = Math.floor(Math.random() * 4);
        let ship = [];
        let col, row;

        switch (rotation) {
            case 0:
                col = Math.floor(Math.random() * 8);
                row = Math.floor(Math.random() * 7);
                while (Utils.checkPosition(board, row, col) ||
                    Utils.checkPosition(board, (row + 1), col ) ||
                    Utils.checkPosition(board, (row + 2), col) ||
                    Utils.checkPosition(board, (row + 2), (col + 1))) {
                        col = Math.floor(Math.random() * 8);
                        row = Math.floor(Math.random() * 7);
                }
                ship = [[col,row], [col,row + 1], [col,row + 2], [col + 1,row + 2]];
                break;
            case 1:
                col = Math.floor(Math.random() * 7) + 2;
                row = Math.floor(Math.random() * 8) + 1;
                while (Utils.checkPosition(board, row, col) ||
                    Utils.checkPosition(board, row, (col - 1)) ||
                    Utils.checkPosition(board, row, (col - 2)) ||
                    Utils.checkPosition(board, (row + 1), (col - 2))) {
                        col = Math.floor(Math.random() * 7) + 2;
                        row = Math.floor(Math.random() * 8) + 1;
                }
                ship = [[col,row], [col - 1,row], [col - 2,row], [col - 2,row + 1]];
                break;
            case 2:
                col = Math.floor(Math.random() * 8) + 1;
                row = Math.floor(Math.random() * 7) + 2;
                while (Utils.checkPosition(board, row, col) ||
                    Utils.checkPosition(board, (row - 1), col) ||
                    Utils.checkPosition(board, (row - 2), col) ||
                    Utils.checkPosition(board, (row - 2), (col - 1))) {
                        col = Math.floor(Math.random() * 8) + 1;
                        row = Math.floor(Math.random() * 7) + 2;
                }
                ship = [[col,row], [col,row - 1], [col,row - 2], [col - 1,row - 2]];
                break;
            case 3:
                col = Math.floor(Math.random() * 7);
                row = Math.floor(Math.random() * 8) + 1;
                while (Utils.checkPosition(board, row, col) ||
                    Utils.checkPosition(board, row, (col + 1)) ||
                    Utils.checkPosition(board, row, (col + 2)) ||
                    Utils.checkPosition(board, (row - 1), (col + 2))) {
                        col = Math.floor(Math.random() * 7);
                        row = Math.floor(Math.random() * 8) + 1;
                }
                ship = [[col,row], [col + 1,row], [col + 2,row], [col + 2,row - 1]];
                break;
        }

        return ship;
    }

    static checkPosition(board, row: number, col: number): boolean {
        return (board[row][col] === 1 || board[row][col] === 9);
    }
}
