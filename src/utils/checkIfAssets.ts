import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionState from './checkIfSectionState';
import checkIfSectionStates from './checkIfSectionStates';

const checkIfAssets: (item: any) => boolean = (item) => {
  if (
    typeof item !== 'object' ||
    Object.keys(item).length !== 4 ||
    !checkIfHistory(item.history) ||
    !checkIfMode(item.mode) ||
    !checkIfSectionStates(item.sectionStates) ||
    !checkIfSectionState(item.winner)
  ) {
    return false;
  }
  return true;
};

export default checkIfAssets;
