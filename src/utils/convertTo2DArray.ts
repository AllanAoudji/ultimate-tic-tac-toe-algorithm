const convertTo2DArray: (array1D: BoardState[]) => Tile[][] = (array1D) => {
  if (Object.keys(array1D).length === 0) {
    throw new Error('argument should be an array with a length of 9 or 81');
  }
  if (array1D.length !== 81 && array1D.length !== 9) {
    throw new Error('argument should be an array with a length of 9 or 81');
  }

  const array2D = array1D.reduce<Tile[][]>((rows, key, index) => {
    if (index % Math.sqrt(array1D.length) === 0) {
      rows.push([
        {
          position1D: index,
          state: key,
        },
      ]);
    } else {
      rows[rows.length - 1].push({
        position1D: index,
        state: key,
      });
    }

    return rows;
  }, []);

  return array2D;
};

export default convertTo2DArray;
