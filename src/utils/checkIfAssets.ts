import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfSectionState from './checkIfSectionState';

const checkIfAssets: (item: any) => boolean = (item) => {
  if (
    typeof item !== 'object' ||
    Object.keys(item).length !== 3 ||
    !checkIfHistory(item.history) ||
    !checkIfSectionState(item.winner) ||
    !checkIfMode(item.mode)
  ) {
    return false;
  }
  return true;
};

export default checkIfAssets;
