import React from 'react';
import ChoiceButton from '../UserChoose/ChoiseButton/ChoiseButton';
import Result from '../Result/Result';
import './DisplayChoose.css';

const DisplayChoose = (props) => {

    const isMobile = window.innerWidth <= 375;

    return (
        <div>
            <div className="display-choose-container">
                <div className="display-choose-user">
                    <h3>YOU PICKED</h3>
                    <ChoiceButton type={props.userHandSelected} />
                </div>

                {props.result && !isMobile && <Result result={props.result} resetChoises={props.resetChoises} /> }

                <div className="display-choose-computer">
                    <h3>THE HOUSE PICKED</h3>
                    {props.computerHandSelected ?
                        <ChoiceButton type={props.computerHandSelected} />
                        :
                        <div className="empty-choise" />
                    }
                </div>    
            </div>
            {props.result && isMobile && <Result result={props.result} resetChoises={props.resetChoises} /> }
        </div>
    )
}

export default DisplayChoose;