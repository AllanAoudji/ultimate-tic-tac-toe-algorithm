import checkIfHistory from './checkIfHistory';
import checkIfPlayer from './checkIfPlayer';

const getPlayerMoves: (
  player: TileState.Player1 | TileState.Player2,
  history: number[],
) => number[] = (player, history) => {
  if (!checkIfPlayer(player)) {
    throw new Error('player should be valid');
  }

  if (!checkIfHistory(history)) {
    throw new Error('history should be valid');
  }

  if (player === TileState.Player1) {
    return history.filter((item) => item % 2);
  }

  return history.filter((item) => item % 2 === 0);
};

export default getPlayerMoves;
