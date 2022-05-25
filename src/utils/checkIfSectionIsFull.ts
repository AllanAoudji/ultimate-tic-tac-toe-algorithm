import {Tile, TileState} from '@src/types';

import convertTo1DArray from './convertTo1DArray';
import mapMatrix from './mapMatrix';
import checkIfSection from './checkIfSection';

const checkIfSectionIsFull: (section: TileState[] | Tile[][]) => boolean = (
  section,
) => {
  let array1D: TileState[];

  if (!checkIfSection(section)) {
    throw new Error('section should be valid.');
  }

  if (section.length === 3) {
    const matrixOfState = mapMatrix(section as Tile[][], (tile) => tile.state);
    array1D = convertTo1DArray(matrixOfState);
  } else {
    array1D = [...(section as TileState[])];
  }

  const isNotFull = array1D.some((tile) => tile === TileState.Empty);

  return !isNotFull;
};

export default checkIfSectionIsFull;
