import {Square} from "./square";
import React from "react";

export interface BoardProps {
    squares: Array<string>,
    onClick: (i: number) => void,
    winner: Array<number> | null,
    squareNumber: number | null
}

export class Board extends React.Component<BoardProps> {

    renderSquare(i: number) {
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