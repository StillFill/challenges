import logo from './logo.svg';
import './App.css';
import Score from './Containers/Score/Score';
import Play from './Containers/Play/Play';
import Rules from './Components/Play/Rules/Rules';
import { useEffect, useState } from 'react';

function App() {

  const [score, setScore] = useState(0);


  const onResult = (result) => {
    let novoScore = score;
    if (result === "win") novoScore = score + 1;
    else if (result === "lose") novoScore = score - 1;

    if (novoScore < 0) return;

    setScore(novoScore);
  }

  return (
    <div className="App">
      <div className="app-score-container">
        <Score score={score} />
      </div>

      <div className="app-play-container">
        <Play onResult={onResult} />
      </div>

      <Rules />
    </div>
  );
}

export default App;
