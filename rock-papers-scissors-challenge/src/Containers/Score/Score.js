import React from 'react';
import './Score.css';

const Score = (props) => {

    const { score } = props;

    return (
        <div className="score-container">
            <div className="score-title-container">
                <span>ROCK</span>
                <span>PAPER</span>
                <span>SCISSORS</span>
            </div>

            <div className="score-count-container">
                <div className="score-title">Score</div>
                <div className="score-value">{score}</div>
            </div>
        </div>
    )
}

export default Score;
