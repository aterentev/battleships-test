import * as React from 'react';
import { Col, Button } from 'react-bootstrap';

interface CellProps {
    type: number,
    onClick?: (e: any) => any
}

interface CellState {}

export class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
    }

    getClasses(): string {
        let cellClasses = 'board-cell';

        switch (this.props.type) {
            case 1:
                cellClasses += ' ship-cell';
                break;
            case 2:
                cellClasses += ' miss-cell disabled';
                break;
            case 3:
                cellClasses += ' hit-cell disabled';
                break;
            default:
                break;
        }

        return cellClasses;
    }

    selectStyle(): string {
        let style = '';

        switch (this.props.type) {
            case 1:
                style = '';
                break;
            case 2:
                style = 'warning';
                break;
            case 3:
                style = 'danger';
                break;
            default:
                style = '';
                break;
        }

        return style;
    }

    render() {
        return (
            <Col className='board-col' xs={1} sm={1} md={1} lg={1}>
                <Button
                    bsStyle={this.selectStyle()}
                    bsSize="large"
                    className={this.getClasses()}
                    onClick={(e: any) => this.props.onClick(e)}
                />
            </Col>
        )
    }
}
