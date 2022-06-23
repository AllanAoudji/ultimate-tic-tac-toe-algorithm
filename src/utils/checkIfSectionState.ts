import {TileState} from '@src/types';

import checkIfTileState from './checkIfTileState';
import checkIfWinningLine from './checkIfWinningLine';

const checkIfSectionState: (arg: any) => boolean = (arg) => {
  if (
    !Array.isArray(arg) ||
    Object.keys(arg).length === 0 ||
    arg.length !== 2 ||
    !checkIfTileState(arg[0])
  ) {
    return false;
  }

  if (arg[0] === TileState.Empty && arg[1] !== null) {
    return false;
  }

  if (
    (arg[0] === TileState.Player1 || arg[0] === TileState.Player2) &&
    !checkIfWinningLine(arg[1])
  ) {
    return false;
  }
  return true;
};

export default checkIfSectionState;
