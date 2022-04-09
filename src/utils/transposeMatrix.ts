import convertTo2DArray from './convertTo2DArray';

const transposeMatrix: (
  array: BoardState[] | BoardState[][],
) => BoardState[][] = (array) => {
  let array2D: BoardState[][];

  // Check if section is a 9 length array or
  // a 3x3 Matrix and assign to array2D
  // a 3x3 representation of section.
  if (Object.keys(array).length === 0) {
    throw new Error(
      'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
    );
  }
  if (array.length !== 3 && array.length !== 9 && array.length !== 81) {
    throw new Error(
      'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
    );
  }

  if (array.length === 3) {
    array.forEach((row) => {
      if (!Array.isArray(row) || row.length !== array.length) {
        throw new Error(
          'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
        );
      }
    });
    array2D = [...(array as BoardState[][])];
  } else if (array.length === 9) {
    const isMatrix = array.some((item) => Array.isArray(item));
    if (isMatrix) {
      array.forEach((row) => {
        if (!Array.isArray(row) || row.length !== array.length) {
          throw new Error(
            'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix',
          );
        }
      });
      array2D = [...(array as BoardState[][])];
    } else {
      array2D = convertTo2DArray(array as BoardState[]);
    }
  } else {
    array2D = convertTo2DArray(array as BoardState[]);
  }

  const transposedArray2D = array2D[0].map((_, colIndex) =>
    array2D.map((row) => row[colIndex]),
  );

  return transposedArray2D;
};

export default transposeMatrix;
