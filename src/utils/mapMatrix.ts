const mapMatrix: <T, TT>(
  matrix: T[][],
  func: (item: T, row: number, col: number, array: T[]) => TT,
) => TT[][] = (matrix, func) => {
  if (!Array.isArray(matrix) || Object.keys(matrix).length === 0) {
    throw new Error('arg should be a matrix');
  }
  matrix.forEach((row) => {
    if (!Array.isArray(row) || Object.keys(row).length === 0) {
      throw new Error('arg should be a matrix');
    }
  });

  const mappedMatrix = matrix.map((row, rowIndex) =>
    row.map((item, rowCol, array) => func(item, rowIndex, rowCol, array)),
  );

  return mappedMatrix;
};

export default mapMatrix;
