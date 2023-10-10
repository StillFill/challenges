export const calculateRockChoise = (oponentChoise) => {
    if (oponentChoise === "scissors") return "win";
    else if (oponentChoise === "paper") return "lose";
    else return "draw";
}

export const calculatePaperChoise = (oponentChoise) => {
    if (oponentChoise === "rock") return "win";
    else if (oponentChoise === "scissors") return "lose";
    else return "draw";
}

export const calculateScissorsChoise = (oponentChoise) => {
    if (oponentChoise === "paper") return "win";
    else if (oponentChoise === "rock") return "lose";
    else return "draw";
}

export const generateComputerChoise = () => {
    const selectOptions = ['paper', 'rock', 'scissors']
    const randomChoise = Math.floor(Math.random() * 3) + 1;
    return selectOptions[randomChoise - 1];
}