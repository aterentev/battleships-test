import * as React from 'react';
import { Grid, Row, Alert } from 'react-bootstrap';

import { Cell } from '../Cell/Cell';

interface BoardProps {
    board: number[][],
    showAlert: boolean,
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
        let rows = this.props.board.map((row, rowIndex) => {
            let cols = row.map((col, colIndex) => <Cell type={col} onClick={(e: any) => this.handleClick(e, rowIndex, colIndex)} />);
            return (<Row>
                {cols}
            </Row>)
        });

        if (this.props.showAlert) {
            return <Alert bsStyle='danger' >The game is over! All ship are sunk!</Alert>
        }

        return (<Grid className='board-grid'>
                {rows}
            </Grid>
        );
    }
}
