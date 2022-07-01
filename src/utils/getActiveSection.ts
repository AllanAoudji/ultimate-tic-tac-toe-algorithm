import {Mode, TileState} from '@src/types';

import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionIsFull from './checkIfSectionIsFull';
import checkIfWon from './checkIfWon';
import getSections from './getSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';

const getActiveSection: (history: number[], mode?: Mode) => number | null = (
  history,
  mode = Mode.Normal,
) => {
  // Check if given props are valids
  if (!checkIfHistory(history)) {
    throw new Error('history should be valid');
  }
  if (!checkIfMode(mode)) {
    throw new Error('mode should be valid');
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

  const sections = getSections(history);
  const index = sections.findIndex((item) => item.position === position);

  // Should never be reached ...
  if (index === -1) {
    throw new Error('position not found');
  }

  // If the section which is supposed to be active is full, return null
  if (checkIfSectionIsFull(sections[index].tiles)) {
    return null;
  }

  // If mode === normal and the active section is already won,
  // current player can play everywhere else
  if (mode === Mode.Normal) {
    const sectionState = checkIfWon(sections[index].tiles);
    if (sectionState[0] !== TileState.Empty) {
      return null;
    }
  }

  return index;
};

export default getActiveSection;
