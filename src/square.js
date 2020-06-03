import React from "react";

export function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}
                style={{backgroundColor: props.selected ? 'blue' : 'white'}}>
            {props.value}
        </button>
    );
}