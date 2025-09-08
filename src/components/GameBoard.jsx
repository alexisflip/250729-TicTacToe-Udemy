const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

export default function GameBoard ({onSelectSquare, turns}) {

    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of turns) {

        const { square, player } = turn;
        const {row, col } = square;

        gameBoard [row][col] = player;

    }
    //console.log(turns);
    //console.log(gameBoard);

    return (
      <ol id='game-board'>
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((columnSymbol, columnIndex) => (
                <li key={columnIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, columnIndex)}
                    disabled={columnSymbol != null}
                  >
                    {columnSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
}
