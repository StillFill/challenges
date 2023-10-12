import Cell from "../Models/Cell";
import { State } from "../Pages/GridView/GridView";

const getBestChoice = (state: State): string => {
    const choiceCell = buildChoicesValues(state);

    return choiceCell;
};

const getAllCells = (state: State): Cell[] => {
    return state.reduce((a, b) => [...a, ...b], [] as Cell[])
}

const getEmptyCells = (state: State): Cell[] => {
    return getAllCells(state).filter(a => !a.markedValue);
}

const buildChoicesValues = (state: State): string => {
    const emptyCells = getEmptyCells(state);

    const interValues: {
        cellId: string;
        intersections: Intersection[]
    }[] = emptyCells.map((c) => {
        const intersections = getCellIntersectionsScore(c, state);

        return {
            cellId: c.id,
            intersections
        }
    })


    let minIntersections = 100;
    let minIntersectionsCellId = "";

    console.log(interValues);

    let cellToWin: string | undefined;

    interValues.forEach((inter) => {
        const cellWin = inter.intersections.find(a => a.crescentDiagonal === 2 || a.descendentDiagonal === 2 || a.horizontal === 2 || a.vertical === 2);
    
        if (cellWin) {
            console.log('CELL TO WIN: ', cellWin.cellId)
            cellToWin = cellWin.cellId;
        }
    });

    if (cellToWin) return cellToWin;

    interValues.forEach((inter, _index) => {
        let sumOfIntersections = 0;
        inter.intersections.forEach(interV => {
            let intersectionSum = 0;
            
            Object.keys(interV).forEach((b) => {
                const interKey = b as keyof Intersection;
                const interValue = interV[interKey];
                if (typeof interValue !== 'number') return;

                if (interValue === 0) return;
                intersectionSum += interValue;
            }, 0);

            sumOfIntersections += intersectionSum;
        })

        if (sumOfIntersections < minIntersections) {
            minIntersections = sumOfIntersections;
            minIntersectionsCellId = inter.cellId;
        }
    })

    return minIntersectionsCellId;
}

const getCellIndexes = (cellId: string, state: State) => {
    const cellRow = state.findIndex(a => a.find(b => b.id === cellId));
    const cellIndex = state[cellRow].findIndex(a => a.id === cellId);

    return [cellRow, cellIndex];
}

const getCellIntersectionsScore = (cell: Cell, state: State) => {
    const newState = JSON.parse(JSON.stringify(state)) as State;

    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);

    newState[cellRow][cellIndex].markedValue = "O";

    const emptyCells = getEmptyCells(newState);

    const cellIntersections = emptyCells.map((c) => {
        const _newState = JSON.parse(JSON.stringify(newState));

        const [cRow, cIndex] = getCellIndexes(c.id, state);
        _newState[cRow][cIndex].markedValue = "X";

        const intersections = getCellIntersections(c, _newState);
        intersections.cellId = c.id;
        return intersections;
    });

    return cellIntersections;
}

const getCellIntersections = (cell: Cell, state: State): Intersection => {
    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);

    const isCrescentEdge = (cellRow === 0 || cellRow === 2) && (cellIndex === 0 || cellIndex === 2);
    const isDecrescentEdge = (cellRow === 0 || cellRow === 2) && (cellIndex === 0 || cellIndex === 2);
    const isCenter = cellRow === 1 && cellIndex === 1;

    const intersections: Intersection = {
        horizontal: 0,
        vertical: 0,
        crescentDiagonal: 0,
        descendentDiagonal: 0,
    }

    intersections.vertical = getVerticalIntersections(cell, state);
    intersections.horizontal = getHorizontalIntersections(cell, state);

    if (isCrescentEdge || isCenter) {
        intersections.crescentDiagonal = getCrescentDiagonalIntersections(cell, state);
    }

    if (isDecrescentEdge || isCenter) {
        intersections.descendentDiagonal = getDecrescentDiagonalIntersections(cell, state);
    }

    return intersections;
}

const getVerticalIntersections = (cell: Cell, state: State): number => {
    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);
    const cellMarkedValue = state[cellRow][cellIndex].markedValue;

    if (!cellMarkedValue) return 0;
    const verticalCells = getCellColumn(cell, state);

    const otherMark = cellMarkedValue === 'X' ? 'O' : 'X';
    const alreadyOtherMarkInSameDirection = verticalCells.find(a => a.markedValue === otherMark);

    if (alreadyOtherMarkInSameDirection) return 0;

    return verticalCells.filter(a => a.id !== cell.id).filter(a => a.markedValue === cellMarkedValue).length;
}

const getHorizontalIntersections = (cell: Cell, state: State): number => {
    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);
    const cellMarkedValue = state[cellRow][cellIndex].markedValue;
    
    if (!cellMarkedValue) return 0;

    const horizontalCells = getCellRow(cell, state);

    const otherMark = cellMarkedValue === 'X' ? 'O' : 'X';
    const alreadyOtherMarkInSameDirection = horizontalCells.find(a => a.markedValue === otherMark);

    if (alreadyOtherMarkInSameDirection) return 0;

    return horizontalCells.filter(a => a.id !== cell.id).filter(a => a.markedValue === cellMarkedValue).length;
}

const getCrescentDiagonalIntersections = (cell: Cell, state: State): number => {
    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);
    const cellMarkedValue = state[cellRow][cellIndex].markedValue;
    
    if (!cellMarkedValue) return 0;

    const crescentCells = getCellCrescentDiagonal(cell, state);

    const otherMark = cellMarkedValue === 'X' ? 'O' : 'X';
    const alreadyOtherMarkInSameDirection = crescentCells.find(a => a.markedValue === otherMark);

    if (alreadyOtherMarkInSameDirection) return 0;

    return crescentCells.filter(a => a.id !== cell.id).filter(a => a.markedValue === cellMarkedValue).length;
}

const getDecrescentDiagonalIntersections = (cell: Cell, state: State): number => {
    const [cellRow, cellIndex] = getCellIndexes(cell.id, state);
    const cellMarkedValue = state[cellRow][cellIndex].markedValue;
    if (!cellMarkedValue) return 0;

    const decrescentCells = getCellDecrescentDiagonal(cell, state);

    const otherMark = cellMarkedValue === 'X' ? 'O' : 'X';
    const alreadyOtherMarkInSameDirection = decrescentCells.find(a => a.markedValue === otherMark);

    if (alreadyOtherMarkInSameDirection) return 0;

    return decrescentCells.filter(a => a.id !== cell.id).filter(a => a.markedValue === cellMarkedValue).length;
}

const getCellRow = (cell: Cell, state: State) => {
    const [cellRow] = getCellIndexes(cell.id, state);
    return [state[cellRow][0], state[cellRow][1], state[cellRow][2]]
}

const getCellColumn = (cell: Cell, state: State) => {
    const [_, cellIndex] = getCellIndexes(cell.id, state);
    return [state[0][cellIndex], state[1][cellIndex], state[2][cellIndex]];
}

const getCellCrescentDiagonal = (cell: Cell, state: State) => {
    return [state[2][0], state[1][1], state[0][2]];
}

const getCellDecrescentDiagonal = (cell: Cell, state: State) => {
    return [state[0][0], state[1][1], state[2][2]];
}

const checkForVictory = (state: State): Victory => {
    const [hX, hO] = checkHorizontal(state);
    const [vX, vO] = checkVertical(state);
    const [cCX, cCO] = checkCrescentDiagonal(state);
    const [cDX, cDO] = checkDecrescentDiagonal(state);

    if (hX || vX || cCX || cDX) return 'player';
    if (hO || vO || cCO || cDO) return 'computer';

    const emptyCells = getEmptyCells(state)
    if (emptyCells.length === 0) return 'draw';

    return undefined;
}

const checkHorizontal = (state: State): [boolean, boolean] => {
    const rows = [getCellRow(state[0][0], state), getCellRow(state[1][0], state), getCellRow(state[2][0], state)];

    const allX = !!rows.find(a => a.filter(b => b.markedValue === 'X').length === 3);
    const allO = !!rows.find(a => a.filter(b => b.markedValue === 'O').length === 3);

    return [allX, allO];
}

const checkVertical = (state: State): [boolean, boolean] => {
    const rows = [getCellColumn(state[0][0], state), getCellColumn(state[0][1], state), getCellColumn(state[0][2], state)];

    const allX = !!rows.find(a => a.filter(b => b.markedValue === 'X').length === 3);
    const allO = !!rows.find(a => a.filter(b => b.markedValue === 'O').length === 3);

    return [allX, allO];
}

const checkCrescentDiagonal = (state: State): [boolean, boolean] => {
    const rows = [getCellCrescentDiagonal(state[2][0], state), getCellCrescentDiagonal(state[1][1], state), getCellCrescentDiagonal(state[0][2], state)];

    const allX = !!rows.find(a => a.filter(b => b.markedValue === 'X').length === 3);
    const allO = !!rows.find(a => a.filter(b => b.markedValue === 'O').length === 3);

    return [allX, allO];
}

const checkDecrescentDiagonal = (state: State): [boolean, boolean] => {
    const rows = [getCellDecrescentDiagonal(state[0][0], state), getCellDecrescentDiagonal(state[1][1], state), getCellDecrescentDiagonal(state[2][2], state)];

    const allX = !!rows.find(a => a.filter(b => b.markedValue === 'X').length === 3);
    const allO = !!rows.find(a => a.filter(b => b.markedValue === 'O').length === 3);

    return [allX, allO];
}

interface Intersection {
    cellId?: string;
    vertical: number;
    horizontal: number;
    descendentDiagonal?: number;
    crescentDiagonal?: number;
}

export type Victory = 'player' | 'computer' | 'draw' | undefined;

// vertical, horizontal, diagonal descendente, diagonal ascendente

export { getBestChoice, getCellIndexes, checkForVictory }