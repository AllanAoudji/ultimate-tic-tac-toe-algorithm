import {Mode, TileState} from '@src/types';

import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionIsFull from './checkIfSectionIsFull';
import checkIfWon from './checkIfWon';
import getSections from './getSections';

const checkIfValidSection: (
  history: number[],
  sectionIndex: number,
  mode?: Mode,
) => boolean = (history, sectionIndex, mode = Mode.Normal) => {
  if (!checkIfHistory(history)) {
    throw new Error('history should be valid.');
  }
  if (sectionIndex < 0 || sectionIndex > 8) {
    throw new Error('sectionIndex should be contain between 0 and 8.');
  }
  if (!checkIfMode(mode)) {
    throw new Error('mode should be valid.');
  }

  const {tiles} = getSections(history)[sectionIndex];

  if (checkIfSectionIsFull(tiles)) {
    return false;
  }

  if (mode === Mode.Normal && checkIfWon(tiles)[0] !== TileState.Empty) {
    return false;
  }

  return true;
};

export default checkIfValidSection;
