import React, { useCallback, useState } from 'react';
import UserChoose from '../../Components/Play/UserChoose/UserChoose';
import DisplayChoose from '../../Components/Play/DisplayChoose/DisplayChoose'
import { calculatePaperChoise, calculateRockChoise, calculateScissorsChoise, generateComputerChoise } from '../../Services/Choises';

const Play = (props) => {
    const [computerHandSelected, setComputerHandSelected] = useState("");
    const [userHandSelected, setUserHandSelected] = useState("");
    const [result, setResult] = useState(null);

    const calculateResult = (userHandSelected, computerHandSelected) => {
        if (!userHandSelected || !computerHandSelected) return;

        switch (userHandSelected) {
            case "rock":
                return calculateRockChoise(computerHandSelected);
            case "paper":
                return calculatePaperChoise(computerHandSelected);
            case "scissors":
                return calculateScissorsChoise(computerHandSelected);
            default:
                return null;
        }
    };

    const onUserChoose = useCallback((userHandSelected) => {
        setUserHandSelected(userHandSelected);

        setTimeout(() => {
            const computerHandChoice = generateComputerChoise();
            setComputerHandSelected(computerHandChoice);

            const res = calculateResult(userHandSelected, computerHandChoice);
            setResult(res);
            
            props.onResult(res);
        }, 1000);
    }, [calculateResult, props])

    const resetChoises = useCallback(() => {
        setUserHandSelected('');
        setComputerHandSelected('');
        setResult(null);
    }, []);

    if (!userHandSelected) {
        return <UserChoose onUserChoose={onUserChoose} />
    }

    return (
        <DisplayChoose
            userHandSelected={userHandSelected}
            computerHandSelected={computerHandSelected}
            resetChoises={resetChoises}
            result={result} // 'win', 'lose', 'draw'
        />
    )
}

export default Play;