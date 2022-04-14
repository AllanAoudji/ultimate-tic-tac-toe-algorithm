import checkIfSectionState from './checkIfSectionState';
import checkIfTileState from './checkIfTileState';

const checkIfSectionStates: (arg: any) => boolean = (arg) => {
  if (
    !Array.isArray(arg) ||
    Object.keys(arg).length === 0 ||
    arg.length !== 9 ||
    arg.some((item) => !checkIfSectionState(item))
  ) {
    return false;
  }
  return true;
};

export default checkIfSectionStates;
