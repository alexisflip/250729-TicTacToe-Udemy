import Log from "./components/Log";
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"

function App() {
  
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, columnIndex){
    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O": "X")
    setGameTurns((prevTurns) => {

      // created to not merge different states due to the unknown scheduled state update from React
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player == "X"){
        currentPlayer = "O";
      }

      const updatedTurns = [
        {square: {row: rowIndex, col: columnIndex}, player: currentPlayer}, ...prevTurns
      ];
      
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName='Player 1'
            symbol='X'
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName='Player 2'
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
