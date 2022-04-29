import {Tile, TileState} from '@src/types';

import checkIfTileState from './checkIfTileState';
import checkIfTile from './checkIfTile';
import convertTo1DArray from './convertTo1DArray';
import mapMatrix from './mapMatrix';

const checkIfSectionIsFull: (section: TileState[] | Tile[][]) => boolean = (
  section,
) => {
  let array1D: TileState[];

  if (!Array.isArray(section) || Object.keys(section).length === 0) {
    throw new Error('arg should be a 9 length array or a 3x3 matrix');
  }
  if (section.length !== 9 && section.length !== 3) {
    throw new Error('arg should be a 9 length array or a 3x3 matrix');
  }
  if (section.length === 3) {
    section.forEach((row) => {
      if (
        !Array.isArray(row) ||
        Object.keys(row).length === 0 ||
        row.length !== section.length
      ) {
        throw new Error('arg should be a 9 length array or a 3x3 matrix');
      }
      (row as Tile[]).map((tile) => {
        if (!checkIfTile(tile)) {
          throw new Error('matrix arg should be a matrix of tile');
        }
      });
    });
    const matrixOfState = mapMatrix(section as Tile[][], (tile) => tile.state);
    array1D = convertTo1DArray(matrixOfState);
  } else {
    section.forEach((tileState) => {
      if (!checkIfTileState(tileState)) {
        throw new Error('array arg should be an array of tileState');
      }
    });
    array1D = [...(section as TileState[])];
  }

  const isNotFull = array1D.some((tile) => tile === TileState.Empty);

  return !isNotFull;
};

export default checkIfSectionIsFull;
