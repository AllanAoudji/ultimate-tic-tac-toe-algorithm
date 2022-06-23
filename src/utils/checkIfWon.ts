import {SectionState, Tile, TileState, WinningLine} from '@src/types';

import convertTo2DArray from './convertTo2DArray';
import transposeMatrix from './transposeMatrix';
import checkIfSection from './checkIfSection';
import checkIfSectionIsFull from './checkIfSectionIsFull';

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
              ? WinningLine.TopRow
              : WinningLine.LeftColumn;
          return [row[0].state, place];
        } else if (index === 1) {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WinningLine.MiddleRow
              : WinningLine.MiddleColumn;
          return [row[0].state, place];
        } else {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WinningLine.BottomRow
              : WinningLine.RightColumn;
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

  if (!checkIfSection(section)) {
    throw new Error('section should be valid.');
  }

  if (checkIfSectionIsFull(section)) {
    return [TileState.Empty, WinningLine.Draw];
  }

  if (section.length === 3) {
    array2D = [...(section as Tile[][])];
  } else {
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
    return [array2D[0][0].state, WinningLine.TopLeftBottomRightDiagonal];
  }
  if (
    array2D[0][2].state === array2D[1][1].state &&
    array2D[1][1].state === array2D[2][0].state &&
    array2D[0][2].state !== TileState.Empty
  ) {
    return [array2D[0][2].state, WinningLine.TopRightBottomLeftDiagonal];
  }

  return [TileState.Empty, null];
};

export default checkIfWon;
