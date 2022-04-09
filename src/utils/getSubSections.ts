import convertTo2DArray from './convertTo2DArray';

const getSubSections: (
  board: BoardState[][] | BoardState[],
) => BoardState[][][] = (board) => {
  let array2D: BoardState[][];

  // Check if outer shape might match
  if (board.length !== 9 && board.length !== 81) {
    throw new Error('arg should be a 81 length array or a 9x9 matrix');
  }

  // Check if whole shape might match
  // and assign the 2D representation of the board
  // to array2D
  if (board.length === 9) {
    board.forEach((row) => {
      if (row.length !== 9) {
        throw new Error('arg should be a 81 length array or a 9x9 matrix');
      }
    });
    array2D = [...(board as BoardState[][])];
  } else {
    array2D = convertTo2DArray(board as BoardState[]);
  }

  // Representation of a scan
  // of each sub board that might be splitted
  const slices = [
    [0, 2, 0, 2],
    [3, 5, 0, 2],
    [6, 9, 0, 2],
    [0, 2, 3, 5],
    [3, 5, 3, 5],
    [6, 9, 3, 5],
    [0, 2, 6, 9],
    [3, 5, 6, 9],
    [6, 9, 6, 9],
  ];

  // Split 9x9 board to 9 different slices
  const subSections = slices.reduce<BoardState[][][]>((rows, key) => {
    const section = array2D
      .slice(key[2], key[3] + 1)
      .map((boardIndex) => boardIndex.slice(key[0], key[1] + 1));
    rows.push(section);
    return rows;
  }, []);

  return subSections;
};

export default getSubSections;
