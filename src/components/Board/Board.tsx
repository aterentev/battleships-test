import * as React from 'react';
import { Grid, Row, Alert } from 'react-bootstrap';

import { Cell } from '../Cell/Cell';

interface BoardProps {
    board: number[][],
    showAlert: boolean,
    onHover: (row: number, col: number) => any,
    onBlur: (row: number, col: number) => any,
    onClick: (row: number, col: number) => any
}
interface BoardState {}

export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
    }

    public handleClick(event: any, row: number, col: number): void {
        event.preventDefault();
        this.props.onClick(row, col);
    }

    render() {
        const { board, showAlert } = this.props;

        let rows = board.map((row, rowIndex) => {
            let cols = row.map((col, colIndex) => (
                <Cell type={col}
                      onClick={(e: any) => this.handleClick(e, rowIndex, colIndex)}
                      onHover={() => this.props.onHover(rowIndex, colIndex)}
                      onBlur={() => this.props.onBlur(rowIndex, colIndex)}/>
            ));
            return (<Row>
                {cols}
            </Row>)
        });

        if (showAlert) {
            return <Alert bsStyle='danger' >The game is over! All ship are sunk!</Alert>
        }

        return (<Grid className='board-grid'>
                {rows}
            </Grid>
        );
    }
}
