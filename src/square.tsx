import React from "react";

export interface SquareProps {
    selected: boolean | null,
    value: string,
    onClick: () => void;
}

export function Square(props: SquareProps) {
    return (
        <button className="square"
                onClick={props.onClick}
                style={{backgroundColor: props.selected ? 'blue' : 'white'}}>
            {props.value}
        </button>
    );
}