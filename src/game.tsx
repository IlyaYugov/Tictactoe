import React, {Props} from "react";
import {calculateWinner} from "./calculateWinner";
import {Board} from "./board";

interface GameProps {
}

interface GameState {
    history: Array<History>,
    stepNumber: number,
    xIsNext: boolean
}
interface History{
    squares: Array<string>
    squareNumber: number | null
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                squareNumber: null
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    renderButtons(history: Array<History> ) {
        const moves = history.map((step, move) => {
            const desc = move
                ? step.squareNumber && `Перейти к ходу (${step.squareNumber % 3 + 1} ${Math.trunc(step.squareNumber / 3) + 1})`
                : 'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        return (moves)
    }

    getStatus(currentHistory: History, winner: Array<number> | null){
        let status = winner
            ? `Выиграл ${currentHistory.squares[winner[0]]}`
            : (!winner && this.state.stepNumber === 9)
                ? 'Игра окончилась вничью'
                :`Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`;
        return status
    }

    render(): JSX.Element {
        const history = this.state.history;
        const currentHistory = history[this.state.stepNumber];
        const winner = calculateWinner(currentHistory.squares);
        const status =this.getStatus(currentHistory, winner);
        const buttons = this.renderButtons(history);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentHistory.squares}
                        onClick={(i) => this.handleClick(i)}
                        squareNumber={currentHistory.squareNumber}
                        winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{buttons}</ol>
                </div>
            </div>
        );
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareNumber: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
}