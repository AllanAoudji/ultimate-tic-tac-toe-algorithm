import {Mode, Tile, TileState} from '@src/types';

import checkIfBoard from './checkIfBoard';
import checkIfMode from './checkIfMode';
import checkIfSectionIsFull from './checkIfSectionIsFull';
import checkIfWon from './checkIfWon';
import getSections from './getSections';

const checkIfValidSection: (
  board: Tile[][] | TileState[],
  sectionIndex: number,
  mode?: Mode,
) => boolean = (board, sectionIndex, mode = Mode.Normal) => {
  if (!checkIfBoard(board)) {
    throw new Error('board should be valid.');
  }
  if (sectionIndex < 0 || sectionIndex > 8) {
    throw new Error('sectionIndex should be contain between 0 and 8.');
  }
  if (!checkIfMode(mode)) {
    throw new Error('mode should be valid.');
  }

  const {tiles} = getSections(board)[sectionIndex];

  if (checkIfSectionIsFull(tiles)) {
    return false;
  }

  if (mode === Mode.Normal && checkIfWon(tiles)[0] !== TileState.Empty) {
    return false;
  }

  return true;
};

export default checkIfValidSection;
