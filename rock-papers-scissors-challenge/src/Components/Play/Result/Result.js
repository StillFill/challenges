import React from 'react';
import FullButton from '../../../Common/Components/FullButton/FullButton';
import './Result.css';

const Result = ({ result, resetChoises }) => {
    return (
       <div className="result-container">
           <h1>
            {result === "win" && 'YOU WIN'}
            {result === "lose" && 'YOU LOSE'}
            {result === "draw" && 'DRAW'}
           </h1>

           <FullButton onClick={resetChoises}>
               PLAY AGAIN
           </FullButton>
       </div> 
    )
}

export default Result;