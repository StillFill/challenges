import React, { useState } from 'react';
import BorderlessButton from '../../../Common/Components/BorderlessButton/BorderlessButton';
import rulesImg from '../../../assets/images/image-rules.svg'
import iconClose from '../../../assets/icons/icon-close.svg'
import './Rules.css';

const Rules = () => {

    const [showRules, setShowRules] = useState(false);

    return (
        <div className="rules-button">
            <BorderlessButton onClick={() => setShowRules(true)}>
                Rules
            </BorderlessButton>

            {showRules &&
                <div className="rules-modal">
                    <div className="rules-modal-content">
                        <div className="rules-modal-image">
                            <div className="rules-modal-title">
                                <h1>
                                    RULES
                                </h1>
                                <img src={iconClose} onClick={() => setShowRules(false)} />
                            </div>

                            <img src={rulesImg} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Rules;