import Log from "./components/Log";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player == "X"){
    currentPlayer = "O";
  }

  return currentPlayer;

}

function checkWinner(turns, players){

  for (const combination of WINNING_COMBINATIONS){

    const first_r = combination[0].row;
    const first_c = combination[0].column;

    const secnd_r = combination[1].row;
    const secnd_c = combination[1].column;

    const third_r = combination[2].row;
    const third_c = combination[2].column;
    
    const symbol_f = turns.find(turn =>
      turn.square.row === first_r && turn.square.col === first_c
    );

    const symbol_s = turns.find(turn =>
      turn.square.row === secnd_r && turn.square.col === secnd_c
    );    
    
    const symbol_t = turns.find(turn =>
      turn.square.row === third_r && turn.square.col === third_c
    );    

    if (symbol_f && symbol_s && symbol_t) {
      if (
        symbol_f.player === symbol_s.player &&
        symbol_s.player === symbol_t.player
      ) {
        console.log('we have a winner baby ',symbol_f.player);
        return(players[symbol_f.player]);
      }
    } 
  }

  return null;

}

function App() {
  
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  const [gameTurns, setGameTurns] = useState([]);

  let winner = null;

  function handleSelectSquare(rowIndex, columnIndex){

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: columnIndex}, player: currentPlayer}, ...prevTurns];
        
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(previous => {
      return {
        ...previous,
        [symbol] : newName
      };
    });
  }

  winner = checkWinner(gameTurns, players);



  console.log(winner);

  const hasDraw = gameTurns.length === 9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurns);

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            initialName='Player 1'
            symbol='X'
            isActive={activePlayer === 'X'}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName='Player 2'
            symbol='O'
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
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
