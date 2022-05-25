import {Mode, Tile, TileState} from '@src/types';

import checkIfBoard from './checkIfBoard';
import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionIsFull from './checkIfSectionIsFull';
import checkIfWon from './checkIfWon';
import convertTo1DArray from './convertTo1DArray';
import getSections from './getSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';
import mapMatrix from './mapMatrix';

const getActiveSection: (
  history: number[],
  board: TileState[] | Tile[][],
  mode?: Mode,
) => number | null = (history, board, mode = Mode.Normal) => {
  let parseBoard: TileState[];

  // Check if given props are valids
  if (!checkIfHistory(history)) {
    throw new Error('history should be valid');
  }
  if (!checkIfBoard(board)) {
    throw new Error('board should be valid');
  }
  if (!checkIfMode(mode)) {
    throw new Error('mode should be valid');
  }

  // Get a flat board
  if (board.length === 9) {
    const stateMatrix = mapMatrix(board as Tile[][], (tile) => tile.state);
    parseBoard = convertTo1DArray(stateMatrix);
  } else {
    parseBoard = [...(board as TileState[])];
  }

  // If is the first move,
  // return null (current player can play everywhere)
  if (history.length === 0) {
    return null;
  }

  // Get position of the last play ...
  const {position} = getTileIndexPositionAndSection(
    history[history.length - 1],
  );

  const sections = getSections(parseBoard);
  const index = sections.findIndex((item) => item.position === position);

  // Should never be reached ...
  if (index === -1) {
    throw new Error('position not found');
  }

  // If mode === normal,
  // and the active section is already won,
  // current player can play everywhere else
  if (
    mode === Mode.Normal &&
    checkIfWon(sections[index].tiles)[0] !== TileState.Empty
  ) {
    return null;

    // If mode === contine
    // the current player can play everywhere
    // only if the active section is full
  } else if (
    mode === Mode.Continue &&
    checkIfSectionIsFull(sections[index].tiles)
  ) {
    return null;
  }

  return index;
};

export default getActiveSection;
