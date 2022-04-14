import checkIfHistory from './checkIfHistory';

const getActivePlayer: (
  history: number[],
) => TileState.Player1 | TileState.Player2 = (history) => {
  if (!checkIfHistory(history)) {
    throw new Error('arg should be a valid history');
  }

  return history.length % 2 === 0 ? TileState.Player1 : TileState.Player2;
};

export default getActivePlayer;
