import * as React from 'react';
import * as _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { Port } from '../Port/Port';
import { Board } from '../Board/Board';
import { Utils } from '../../utils/utils';

import * as CONST from '../../const';

interface GameProps {}
interface GameState {
    placedShips: boolean[],
    gameStarted: boolean,
    selectedShip: [number, number[][]],
    board: number[][],
    preBoard: number[][],
    sunkShips: number
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            placedShips: [false, false, false, false],
            gameStarted: false,
            selectedShip: [0, [[]]],
            board: [[0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]],
            preBoard: [[0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0],
                       [0,0,0,0,0,0,0,0,0,0]],
            sunkShips: 0
        };
    }

    onGameStart() {
        this.setState({
            selectedShip: [0, [[]]],
            gameStarted: true,
            board: this.state.preBoard.slice(0)
        })
    }

    handlePortClick(id) {
        if (id === 1) {
            Utils.IRotation = Math.floor(Math.random() * 2)
        } else if (id === 0) {
            Utils.LRotation = Math.floor(Math.random() * 4)
        }
        this.setState({
            selectedShip: [id, [[]]]
        });
    }

    handleClick(row: number, col: number): void {
        let updatedBoard = this.state.board.slice(0);
        let cell = this.state.board[row][col];

        if (this.state.selectedShip[0] !== 0) {
            if (this.state.preBoard[row][col] === CONST.TYPES.HIT) return;
            let board = Utils.placeShip(this.state.board.slice(0), this.state.selectedShip[1]);
            let placedShips = this.state.placedShips.slice(0);
            placedShips[this.state.selectedShip[0] - 1] = true;
            this.setState({
                placedShips: placedShips.slice(0),
                selectedShip: [0, [[]]],
                preBoard: board.slice(0),
                board: board.slice(0)
            });
            return;
        }

        if (!this.state.gameStarted) return;
        switch (cell) {
            case 0:
            case 9:
                updatedBoard[row][col] = CONST.TYPES.MISS;
                break;
            case 1:
                updatedBoard = this.sunkShip(updatedBoard, row, col);
                break;
            default:
                break;
        }

        this.setState({
            board: updatedBoard.slice(0)
        })
    }

    handleHover(row: number, col: number) {
        if (this.state.selectedShip[0] === 0) return;
        let board = Utils.onHover(this.state.selectedShip[0], row, col);
        this.setState({
            selectedShip: [this.state.selectedShip[0], board.ship],
            preBoard: board.board.slice(0)
        });
    }

    handleBlur(row: number, col: number) {
        if (this.state.selectedShip[0] === 0) return;
        let board = Utils.onBlur(Array.of(...this.state.board), this.state.selectedShip[0], row, col);
        this.setState({
            preBoard: board.slice(0)
        });
    }

    sunkShip(board: number[][], row: number, col: number): number[][] {
        board[row][col] = CONST.TYPES.HIT;

        let flat = _.flatten(board);
        let indicator = flat.find(col => col === 1);

        if (!indicator) {
            this.setState({
                sunkShips: 4
            });
        }

        return board;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={4} md={4} lg={4}>
                        <Port placedShips={this.state.placedShips}
                              onClick={(id) => this.handlePortClick(id)}
                              onStart={() => this.onGameStart()} />
                    </Col>
                    <Col xs={8} md={8} lg={8}>
                        <Board
                            board={this.state.gameStarted ? this.state.board : this.state.preBoard}
                            showAlert={this.state.sunkShips > 3}
                            onHover={(row, col) => this.handleHover(row, col)}
                            onBlur={(row, col) => this.handleBlur(row, col)}
                            onClick={(row: number, col: number) => this.handleClick(row, col)}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
