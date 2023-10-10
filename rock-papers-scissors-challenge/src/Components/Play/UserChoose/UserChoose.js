import React from 'react';
import './UserChoose.css';
import bgTriangle from '../../../assets/images/bg-triangle.svg'
import ChoiseButton from './ChoiseButton/ChoiseButton';


const UserChoise = (props) => {
    return (
        <div className="user-choise-container">
            <img src={bgTriangle} />
            <div className="choise-button-container choise-button-container-paper">
                <ChoiseButton type="paper" onClick={() => props.onUserChoose("paper")} />
            </div>
            <div className="choise-button-container choise-button-container-scissors">
                <ChoiseButton type="scissors" onClick={() => props.onUserChoose("scissors")}/>
            </div>
            <div className="choise-button-container choise-button-container-rock">
                <ChoiseButton type="rock" onClick={() => props.onUserChoose("rock")}/>
            </div>
        </div>
    )
}

export default UserChoise;