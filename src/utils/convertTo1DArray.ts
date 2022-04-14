const convertTo1DArray: (array2D: TileState[][]) => TileState[] = (array2D) => {
  if (!Array.isArray(array2D) || Object.keys(array2D).length === 0) {
    throw new Error('arg should be a 3x3 or a 9x9 matrix');
  }

  const colsLength = array2D.length;

  if (colsLength !== 3 && colsLength !== 9) {
    throw new Error('arg should be a 3x3 or a 9x9 matrix');
  }

  array2D.forEach((row) => {
    if (
      !Array.isArray(row) ||
      Object.keys(row).length === 0 ||
      row.length !== colsLength
    ) {
      throw new Error('arg should be a 3x3 or a 9x9 matrix');
    }
  });

  const array1D = ([] as TileState[]).concat(...array2D);

  return array1D;
};

export default convertTo1DArray;
