import {SectionState, Tile, TileState, WiningLine} from '@src/types';

import checkIfTileState from './checkIfTileState';
import checkIfTile from './checkIfTile';
import convertTo2DArray from './convertTo2DArray';
import transposeMatrix from './transposeMatrix';

enum RowOrColumn {
  Row,
  Col,
}

const checkColumnsOrRows: (
  array: Tile[][],
  rowOrColumn: RowOrColumn,
) => SectionState = (array, rowOrColumn) => {
  const state = array.reduce<SectionState>(
    (previousValue, row, index) => {
      // If loop has already find a wining row/col,
      // return.
      if (previousValue[0] !== TileState.Empty) {
        return previousValue;
      }

      // Continue if A === B && B === C
      // and A !== Empty.
      if (
        row[0].state === row[1].state &&
        row[1].state === row[2].state &&
        row[0].state !== TileState.Empty
      ) {
        // Check if we check the columns or the row,
        // and assign the winning player and the position
        // of the row/col.
        if (index === 0) {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.TopRow
              : WiningLine.LeftColumn;
          return [row[0].state, place];
        } else if (index === 1) {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.MiddleRow
              : WiningLine.MiddleColumn;
          return [row[0].state, place];
        } else {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.BottomRow
              : WiningLine.RightColumn;
          return [row[0].state, place];
        }
      }

      // If no wining row/col has been found
      // return empty.
      return [TileState.Empty, null];
    },
    [TileState.Empty, null],
  );
  return state;
};

const checkIfWon: (section: TileState[] | Tile[][]) => SectionState = (
  section,
) => {
  let array2D: Tile[][];

  if (!Array.isArray(section) || Object.keys(section).length === 0) {
    throw new Error('arg should be a 9 length array or a 9x9 matrix');
  }

  // Check if section is a 9 length array or
  // a 3x3 Matrix and assign to array2D
  // a 3x3 representation of section.
  if (section.length !== 9 && section.length !== 3) {
    throw new Error('arg should be a 9 length array or a 9x9 matrix');
  }
  if (section.length === 3) {
    section.forEach((row) => {
      if (
        !Array.isArray(row) ||
        Object.keys(row).length === 0 ||
        row.length !== section.length
      ) {
        throw new Error('arg should be a 9 length array or a 9x9 matrix');
      }
      (row as Tile[]).forEach((tile) => {
        if (!checkIfTile(tile)) {
          throw new Error('matrix arg should be a matrix of tile');
        }
      });
    });
    array2D = [...(section as Tile[][])];
  } else {
    section.forEach((tileState) => {
      if (!checkIfTileState(tileState)) {
        throw new Error('array arg should be an array of tileState');
      }
    });
    array2D = convertTo2DArray(section as TileState[]);
  }

  // Check if a row is wining.
  const stateRows = checkColumnsOrRows(array2D, RowOrColumn.Row);
  if (stateRows[0] !== TileState.Empty) {
    return stateRows;
  }

  // Check if a column is wining.
  const transposeArray2D = transposeMatrix(array2D);
  const stateColumns = checkColumnsOrRows(transposeArray2D, RowOrColumn.Col);
  if (stateColumns[0] !== TileState.Empty) {
    return stateColumns;
  }

  // Check if a diagonal is wining.
  if (
    array2D[0][0].state === array2D[1][1].state &&
    array2D[1][1].state === array2D[2][2].state &&
    array2D[0][0].state !== TileState.Empty
  ) {
    return [array2D[0][0].state, WiningLine.TopLeftBottomRightDiagonal];
  }
  if (
    array2D[0][2].state === array2D[1][1].state &&
    array2D[1][1].state === array2D[2][0].state &&
    array2D[0][2].state !== TileState.Empty
  ) {
    return [array2D[0][2].state, WiningLine.TopRightBottomLeftDiagonal];
  }

  return [TileState.Empty, null];
};

export default checkIfWon;
