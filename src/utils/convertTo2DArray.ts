const convertTo2DArray: <T>(array1D: T[]) => T[][] = (array1D) => {
  if (array1D.length !== 81 && array1D.length !== 9) {
    throw new Error('argument should be an array with a length of 9 or 81');
  }

  const array2D = array1D.reduce<typeof array1D[0][][]>((rows, key, index) => {
    if (index % Math.sqrt(array1D.length) === 0) {
      rows.push([key]);
    } else {
      rows[rows.length - 1].push(key);
    }

    return rows;
  }, []);

  return array2D;
};

export default convertTo2DArray;
