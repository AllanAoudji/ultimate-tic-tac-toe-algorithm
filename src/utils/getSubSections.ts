const getSubSections: (board: BoardState[][]) => BoardState[][][] = (board) => {
  if (board.length !== 9) {
    throw new Error('arg should be an array with a length of 81');
  }
  board.forEach((row) => {
    if (row.length !== 9) {
      throw new Error('arg should be an array with a length of 81');
    }
  });

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

  const subSections = slices.reduce<BoardState[][][]>((rows, key) => {
    const section = board
      .slice(key[2], key[3] + 1)
      .map((boardIndex) => boardIndex.slice(key[0], key[1] + 1));
    rows.push(section);
    return rows;
  }, []);

  return subSections;
};

export default getSubSections;
