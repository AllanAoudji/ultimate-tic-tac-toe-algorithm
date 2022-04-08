const convertTo1DArray: <T>(array2D: T[][]) => T[] = (array2D) => {
  const colsLength = array2D.length;

  if (colsLength !== 3 && colsLength !== 9) {
    throw new Error('arg should be a 3x3 or a 9x9 matrix');
  }
  array2D.forEach((row) => {
    if (row.length !== colsLength) {
      throw new Error('arg should be a 3x3 or a 9x9 matrix');
    }
  });

  const array1D = ([] as typeof array2D[0][0][]).concat(...array2D);

  return array1D;
};

export default convertTo1DArray;
