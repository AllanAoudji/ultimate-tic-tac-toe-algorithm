import {Tile, TileState} from '@src/types';

import checkIfSection from './checkIfSection';
import convertTo1DArray from './convertTo1DArray';
import convertTo2DArray from './convertTo2DArray';
import mapMatrix from './mapMatrix';
import transposeMatrix from './transposeMatrix';

const checkColumnsRowsOrDiagonals: (array: Tile[][]) => boolean = (array) => {
  const states = array.reduce<boolean[]>((previousValue, row, index) => {
    // If there is at least one draw on the row/column/diagonal
    // the row/column/diagonal is a draw
    const haveDraw = row.some((tile) => tile.state === TileState.Draw);
    if (haveDraw) {
      previousValue[index] = true;
      return previousValue;
    }
    const moves = row.filter(
      (tile) =>
        tile.state === TileState.Player1 || tile.state === TileState.Player2,
    );

    // If there are less than 2 moves in this line,
    // this line can't be a draw
    if (moves.length < 2) {
      return previousValue;
    }

    // If every moves are equal (played by the same player)
    // this line can't be a draw
    if (moves.every((move) => move.state === moves[0].state)) {
      return previousValue;
    }
    previousValue[index] = true;
    return previousValue;
  }, new Array(array.length).fill(false));
  if (states.every((state) => state)) {
    return true;
  }
  return false;
};

const checkIfDraw: (section: TileState[] | Tile[][]) => boolean = (section) => {
  let array2D: Tile[][];
  if (!checkIfSection(section)) {
    throw new Error('section should be valid.');
  }

  if (section.length === 3) {
    array2D = [...(section as Tile[][])];
  } else {
    array2D = convertTo2DArray(section as TileState[]);
  }

  // Check if there is a draw only
  // if there is at least 8 moves in the section
  // or if there is at least 3 draw in the section
  const numOfDraw = convertTo1DArray(
    mapMatrix(array2D, (tile) => tile.state),
  ).filter((tile) => tile === TileState.Draw).length;
  const numOfMoves = convertTo1DArray(
    mapMatrix(array2D, (tile) => tile.state),
  ).filter(
    (tile) => tile === TileState.Player1 || tile === TileState.Player2,
  ).length;
  if (numOfDraw < 3 && numOfMoves < 5) {
    return false;
  }

  // Check if all rows and all columns are equal
  const diagonalTLBR = [array2D[0][0], array2D[1][1], array2D[2][2]];
  const diagonalTRBL = [array2D[0][2], array2D[1][1], array2D[2][0]];
  const diagonals = [diagonalTLBR, diagonalTRBL];

  const rowsAreAllDraw = checkColumnsRowsOrDiagonals(array2D);
  const columnsAreAllDraw = checkColumnsRowsOrDiagonals(
    transposeMatrix(array2D),
  );
  const diagonalsAreAllDraw = checkColumnsRowsOrDiagonals(diagonals);

  if (rowsAreAllDraw && columnsAreAllDraw && diagonalsAreAllDraw) {
    return true;
  }
  return false;
};

export default checkIfDraw;
