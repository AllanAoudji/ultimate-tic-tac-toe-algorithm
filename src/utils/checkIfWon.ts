import convertTo2DArray from './convertTo2DArray';
import transposeMatrix from './transposeMatrix';

enum RowOrColumn {
  Row,
  Col,
}

const checkColumnsOrRows: (
  array: BoardState[][],
  rowOrColumn: RowOrColumn,
) => [BoardState, WiningLine] | BoardState.Empty = (array, rowOrColumn) => {
  const state = array.reduce<[BoardState, WiningLine] | BoardState.Empty>(
    (previousValue, row, index) => {
      // If loop has already find a wining row/col,
      // return.
      if (previousValue !== BoardState.Empty) {
        return previousValue;
      }

      // Continue if A === B && B === C
      // and A !== Empty.
      if (
        row[0] === row[1] &&
        row[1] === row[2] &&
        row[0] !== BoardState.Empty
      ) {
        // Check if we check the columns or the row,
        // and assign the winning player and the position
        // of the row/col.
        if (index === 0) {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.TopRow
              : WiningLine.LeftColumn;
          return [row[0], place];
        } else if (index === 1) {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.MiddleRow
              : WiningLine.MiddleColumn;
          return [row[0], place];
        } else {
          const place =
            rowOrColumn === RowOrColumn.Row
              ? WiningLine.BottomRow
              : WiningLine.RightColumn;
          return [row[0], place];
        }
      }

      // If no wining row/col has been found
      // return empty.
      return BoardState.Empty;
    },
    BoardState.Empty,
  );
  return state;
};

const checkIfWon: (
  section: BoardState[] | BoardState[][],
) => [BoardState, WiningLine] | BoardState.Empty = (section) => {
  let array2D: BoardState[][];

  // Check if section is a 9 length array or
  // a 3x3 Matrix and assign to array2D
  // a 3x3 representation of section.
  if (section.length !== 9 && section.length !== 3) {
    throw new Error('arg should be a 9 length array or a 9x9 matrix');
  }
  if (section.length === 3) {
    section.forEach((row) => {
      if (!Array.isArray(row) || row.length !== 3) {
        throw new Error('arg should be a 9 length array or a 9x9 matrix');
      }
    });
    array2D = [...(section as BoardState[][])];
  } else {
    array2D = convertTo2DArray(section as BoardState[]);
  }

  // Check if a row is wining.
  const stateRows = checkColumnsOrRows(array2D, RowOrColumn.Row);
  if (stateRows !== BoardState.Empty) {
    return stateRows;
  }

  // Check if a column is wining.
  const transposeArray2D = transposeMatrix(array2D);
  const stateColumns = checkColumnsOrRows(transposeArray2D, RowOrColumn.Col);
  if (stateColumns !== BoardState.Empty) {
    return stateColumns;
  }

  // Check if a diagonal is wining.
  if (
    array2D[0][0] === array2D[1][1] &&
    array2D[1][1] === array2D[2][2] &&
    array2D[0][0] !== BoardState.Empty
  ) {
    return [array2D[0][0], WiningLine.TopLeftBottomRightDiagonal];
  }
  if (
    array2D[0][2] === array2D[1][1] &&
    array2D[1][1] === array2D[2][0] &&
    array2D[0][2] !== BoardState.Empty
  ) {
    return [array2D[0][2], WiningLine.TopRightBottomLeftDiagonal];
  }

  return BoardState.Empty;
};

export default checkIfWon;
