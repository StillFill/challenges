import React, { useCallback, useEffect, useState } from 'react';
import "./GridView.scss";
import Player, { Mark } from '../../Models/Player';
import Computer from '../../Models/Computer';
import Cell from '../../Models/Cell';
import { Victory, checkForVictory, getBestChoice, getCellIndexes } from '../../Services/Choices';

const defaultState: State = [
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()]
];

const GridView = () => {

    const [currentState, setCurrentState] = useState<State>(defaultState);
    const [currentPlayer, setCurrentPlayer] = useState<Player | Computer>();

    const [player, setPlayer] = useState<Player>();
    const [computer, setComputer] = useState<Computer>();
    
    const [victory, setVictory] = useState<Victory>();

    const playComputer = useCallback((state: State) => {
        const cellId = getBestChoice(state);
        const newCurrentState = JSON.parse(JSON.stringify(state));

        const [cptRowIndex, cptCellIndex] = getCellIndexes(cellId, currentState);

        if (!computer?.mark) return;

        newCurrentState[cptRowIndex][cptCellIndex].markedValue = computer.mark;
        
        setTimeout(() => {
            setCurrentState(newCurrentState);
            const computerVictory = checkForVictory(newCurrentState);

            if (computerVictory) {
                setVictory(computerVictory);
            }
        }, 500)
    }, [currentState, currentPlayer, setCurrentState])

    useEffect(() => {
        const player = new Player('X');
        setPlayer(player);

        const computer = new Computer('O');
        setComputer(computer);

        setCurrentPlayer(player);
    }, [setCurrentPlayer]);

    const selectCell = useCallback((rowIndex: number, cellIndex: number) => {

        const cellValue = currentState[rowIndex][cellIndex];

        if ((cellValue && cellValue.markedValue) || !currentPlayer) return;

        const state = JSON.parse(JSON.stringify(currentState));
        
        state[rowIndex][cellIndex].markedValue = currentPlayer.mark;

        setCurrentState(state);

        const playerVictory = checkForVictory(state);
        console.log("VITORIA DO PLAYER? ", playerVictory);

        if (playerVictory) {
            setVictory(playerVictory);
            return;
        }

        playComputer(state);

    }, [currentState, currentPlayer, setCurrentState])

    const resetGame = useCallback(() => {
        setCurrentState(defaultState);
        setCurrentPlayer(player)
        setVictory(undefined);
    }, [setCurrentState, setCurrentPlayer, setVictory, player]);

    return (
        <div className="grid-view-container">
            {victory &&
                <div className='victory-container'>
                    {victory !== 'draw' && <h1>Vitória do {victory === 'computer' ? 'computador' : 'jogador'}</h1>}
                    {victory === 'draw' && <h1>EMPATE</h1>}
                    <button onClick={resetGame}>Jogar novamente</button>
                </div>
            }
            <div className='grid-view'>
                {currentState.map((stateRow, rowIndex) => (
                    <div className='grid-row' key={rowIndex}>
                        {stateRow.map((gridCell, cellIndex) => (
                            <button onClick={() => selectCell(rowIndex, cellIndex)} className={`grid-cell ${!gridCell.markedValue ? 'empty': ''}`} key={`${rowIndex}-${cellIndex}`}>
                                {gridCell.markedValue}
                            </button>
                        ))}
                    </div>
                ))}
                </div>
        </div>
    )
}

export type State =[Cell, Cell, Cell][];

export default GridView;