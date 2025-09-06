export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map(turn => (
        <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.square.row},{turn.square.col}, Player {turn.player}
        </li>
      ))}
    </ol>
  );
}
