import React from 'react';
import './ChoiseButton.css';
import iconPaper from '../../../../assets/icons/icon-paper.svg'
import iconRock from '../../../../assets/icons/icon-rock.svg'
import iconScissors from '../../../../assets/icons/icon-scissors.svg'

const ChoiseButton = (props) => {

    let icon = "";

    if (props.type === 'paper') icon = iconPaper;
    if (props.type === 'rock') icon = iconRock;
    if (props.type === 'scissors') icon = iconScissors;

    const { type } = props;

    return (
        <div className={`choise-button ${type} ${props.onClick ? "clickable": ""}`} {...props}>
            <img src={icon}/>
        </div>
    )
}

export default ChoiseButton;