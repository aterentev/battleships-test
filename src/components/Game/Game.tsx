import * as React from 'react';
import { Board } from '../Board/Board';
import { Utils } from '../../utils/utils';

import * as CONST from '../../const';

interface GameProps {}
interface GameState {
    board: number[][],
    sunkShips: number
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            board: Utils.boardWithShips(),
            sunkShips: 0
        };
    }

    handleClick(row: number, col: number): void {
        let updatedBoard = this.state.board;
        let cell = this.state.board[row][col];

        switch (cell) {
            case 0:
            case 9:
                updatedBoard[row][col] = CONST.TYPES.MISS;
                break;
            case 1:
                updatedBoard = this.sunkShip(updatedBoard, row, col);
                this.setState({
                    sunkShips: this.state.sunkShips + 1
                });
                break;
            default:
                break;
        }

        this.setState({
            board: updatedBoard
        })
    }

    sunkShip(board: number[][], row: number, col: number): number[][] {
        board[row][col] = CONST.TYPES.HIT;
        if (col > 0 && this.state.board[row][col - 1] === CONST.TYPES.SHIP) {
            board[row][col - 1] = CONST.TYPES.HIT;
            this.sunkShip(board, row, col - 1);
        }

        if (col < 9 && this.state.board[row][col + 1] === CONST.TYPES.SHIP) {
            board[row][col + 1] = CONST.TYPES.HIT;
            this.sunkShip(board, row, col + 1);
        }

        if (row > 0 && this.state.board[row - 1][col] === CONST.TYPES.SHIP) {
            board[row - 1][col] = CONST.TYPES.HIT;
            this.sunkShip(board, row - 1, col);
        }

        if (row < 9 && this.state.board[row + 1][col] === CONST.TYPES.SHIP) {
            board[row + 1][col] = CONST.TYPES.HIT;
            this.sunkShip(board, row + 1, col);
        }

        return board;
    }

    render() {
        return (
            <Board
                board={this.state.board}
                showAlert={this.state.sunkShips > 3}
                onClick={(row: number, col: number) => this.handleClick(row, col)}
            />
        );
    }
}
