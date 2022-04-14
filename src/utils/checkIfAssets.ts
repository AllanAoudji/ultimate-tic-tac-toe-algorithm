import checkIfBoard from './checkIfBoard';
import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionState from './checkIfSectionState';
import checkIfSectionStates from './checkIfSectionStates';

const checkIfAssets: (item: any) => boolean = (item) => {
  if (
    typeof item !== 'object' ||
    Object.keys(item).length !== 6 ||
    !checkIfBoard(item.board) ||
    !checkIfHistory(item.history) ||
    !checkIfSectionStates(item.sectionStates) ||
    !checkIfSectionState(item.winner) ||
    !checkIfMode(item.mode)
  ) {
    return false;
  }
  return true;
};

export default checkIfAssets;
