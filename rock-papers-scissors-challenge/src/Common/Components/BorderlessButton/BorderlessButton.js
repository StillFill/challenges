import React from 'react';
import './BorderlessButton.css';

const BorderlessButton = (props) => {
    return (
        <button className="borderless-button" {...props}>
            {props.children}
        </button>
    )
}

export default BorderlessButton;