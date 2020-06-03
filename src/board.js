import React from "react";
import {Square} from "./square";

export class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                selected={i === this.props.squareNumber || this.props.winner && this.props.winner.includes(i)}
            />
        );
    }

    render() {
        const size = [0, 1, 2];

        return (
            <div>{
                size.map(row =>
                    <div className="board-row">{
                        size.map(column =>
                            this.renderSquare(row * 3 + column))
                    }
                    </div>)
            }
            </div>
        );
    }
}