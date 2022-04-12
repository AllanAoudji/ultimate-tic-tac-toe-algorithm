import checkIfBoard from './checkIfBoard';
import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionIsFull from './checkIfSectionIsFull';
import checkIfWon from './checkIfWon';
import convertTo1DArray from './convertTo1DArray';
import getSubSections from './getSubSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';
import mapMatrix from './mapMatrix';

const getActiveSection: (
  history: number[],
  board: TileState[] | Tile[][],
  mode?: Mode,
) => number | null = (history, board, mode = Mode.Normal) => {
  let parseBoard: TileState[];

  if (!checkIfHistory(history)) {
    throw new Error('history should be valid');
  }
  if (!checkIfBoard(board)) {
    throw new Error('board should be valid');
  }
  if (!checkIfMode(mode)) {
    throw new Error('mode should be valid');
  }

  if (board.length === 9) {
    const stateMatrix = mapMatrix(board as Tile[][], (tile) => tile.state);
    parseBoard = convertTo1DArray(stateMatrix);
  } else {
    parseBoard = [...(board as TileState[])];
  }

  if (history.length === 0) {
    return null;
  }

  const {position} = getTileIndexPositionAndSection(
    history[history.length - 1],
  );

  const sections = getSubSections(parseBoard);
  const index = sections.findIndex((item) => item.position === position);

  if (index === -1) {
    throw new Error('position not found');
  }

  if (
    mode === Mode.Normal &&
    checkIfWon(sections[index].tiles)[0] !== TileState.Empty
  ) {
    return null;
  } else if (
    mode === Mode.Continue &&
    checkIfSectionIsFull(sections[index].tiles)
  ) {
    return null;
  }

  return index;
};

export default getActiveSection;
