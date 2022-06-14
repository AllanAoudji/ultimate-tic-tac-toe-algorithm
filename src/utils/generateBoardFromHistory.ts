import {TileState} from '@src/types';

import checkIfHistory from './checkIfHistory';
import getPlayerMoves from './getPlayerMoves';

const generateBoardFromHistory: (history: number[]) => TileState[] = (
  history,
) => {
  if (!checkIfHistory(history)) {
    throw new Error('history is invalid');
  }
  const board = new Array(81).fill(TileState.Empty);

  if (history.length > 0) {
    getPlayerMoves(TileState.Player1, history).forEach((move) => {
      board[move] = TileState.Player1;
    });
    getPlayerMoves(TileState.Player2, history).forEach((move) => {
      board[move] = TileState.Player2;
    });
  }

  return board;
};

export default generateBoardFromHistory;
