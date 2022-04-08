const convertTo1DArray: <T>(array2D: T[][]) => T[] = (array2D) => {
  const array1D = ([] as typeof array2D[0][0][]).concat(...array2D);

  return array1D;
};

export default convertTo1DArray;
