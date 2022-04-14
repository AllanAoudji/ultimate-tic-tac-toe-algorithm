import {Tile, TileState} from '@src/types';

import checkIfTileState from './checkIfTileState';
import checkIfTile from './checkIfTile';
import convertTo2DArray from './convertTo2DArray';

const transposeMatrix: (array: TileState[] | Tile[][]) => Tile[][] = (
  array,
) => {
  let array2D: Tile[][];

  // Check if section is a 9 length array or
  // a 3x3 Matrix and assign to array2D
  // a 3x3 representation of section.
  if (!Array.isArray(array) || Object.keys(array).length === 0) {
    throw new Error(
      'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
    );
  }
  if (array.length !== 3 && array.length !== 9 && array.length !== 81) {
    throw new Error(
      'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
    );
  }

  // Check for 3x3 matrix
  if (array.length === 3) {
    array.forEach((row) => {
      if (
        !Array.isArray(row) ||
        Object.keys(row).length === 0 ||
        row.length !== array.length
      ) {
        throw new Error(
          'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
        );
      }
      (row as Tile[]).forEach((tile) => {
        if (!checkIfTile(tile)) {
          throw new Error('matrix arg should be a matrix of tile');
        }
      });
    });
    array2D = [...(array as Tile[][])];
  } else if (array.length === 9) {
    const isMatrix = array.some((item) => Array.isArray(item));

    // Check for 9x9 matrix.
    if (isMatrix) {
      array.forEach((row) => {
        if (
          !Array.isArray(row) ||
          Object.keys(row).length === 0 ||
          row.length !== array.length
        ) {
          throw new Error(
            'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
          );
        }
        (row as Tile[]).forEach((tile) => {
          if (!checkIfTile(tile)) {
            throw new Error('matrix arg should be a matrix of tile');
          }
        });
      });
      array2D = [...(array as Tile[][])];

      // Check for 9 length 1D array
    } else {
      array.forEach((item) => {
        if (!checkIfTileState(item)) {
          throw new Error('array arg should be an array of tileState');
        }
      });
      array2D = convertTo2DArray(array as TileState[]);
    }

    // Check for 81 length 1D array
  } else {
    array.forEach((item) => {
      if (!checkIfTileState(item)) {
        throw new Error('array arg should be an array of tileState');
      }
    });
    array2D = convertTo2DArray(array as TileState[]);
  }

  const transposedArray2D = array2D[0].map((_, colIndex) =>
    array2D.map((row) => row[colIndex]),
  );

  return transposedArray2D;
};

export default transposeMatrix;
