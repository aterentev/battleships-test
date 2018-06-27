import * as React from 'react';
import { Button } from 'react-bootstrap';

interface PortProps {
    placedShips: boolean[],
    onClick: (id: number) => any,
    onStart: () => any
}
interface PortState {}

export class Port extends React.Component<PortProps, PortState> {
    constructor(props) {
        super(props);
    }

    render() {
        const ships = [
            { id: 1, type: 'l', title: 'L-Ship' },
            { id: 2, type: 'i', title: 'I-Ship' },
            { id: 3, type: 'dot', title: 'First Dot-Ship' },
            { id: 4, type: 'dot', title: 'Second Dot-Ship' }
        ];
        let buttons = ships.map(ship => (
            <Button bsStyle='primary'
                    bsSize="large"
                    disabled={this.props.placedShips[ship.id - 1]}
                    onClick={!this.props.placedShips[ship.id - 1] ? () => this.props.onClick(ship.id) : null }
                    block>
                {ship.title}
            </Button>
        ));

        return (
            <div className="well">
                {buttons}
                <Button bsStyle='success'
                        bsSize="large"
                        onClick={() => {this.props.onStart()}}
                        block>Start Game!</Button>
            </div>
        );
    }
}
