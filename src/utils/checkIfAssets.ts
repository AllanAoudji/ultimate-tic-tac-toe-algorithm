import checkIfBoard from './checkIfBoard';
import checkIfHistory from './checkIfHistory';
import checkIfMode from './checkIfMode';
import checkIfPlayer from './checkIfPlayer';
import checkIfSectionStates from './checkIfSectionStates';
import checkIfTileState from './checkIfTileState';

const checkIfAssets: (item: any) => boolean = (item) => {
  if (
    typeof item !== 'object' ||
    Object.keys(item).length !== 7 ||
    !checkIfPlayer(item.activePlayer) ||
    !checkIfBoard(item.board) ||
    !checkIfHistory(item.history) ||
    !checkIfSectionStates(item.sectionStates) ||
    !checkIfTileState(item.winner) ||
    !checkIfMode(item.mode)
  ) {
    return false;
  }
  return true;
};

export default checkIfAssets;
