import React from 'react';
import './FullButton.css';

const FullButton = (props) => {
    return (
        <button className="full-button" {...props}>
            {props.children}
        </button>
    )
}

export default FullButton;