const createBoard: () => BoardState[] = () =>
  new Array<BoardState>(81).fill(BoardState.Empty);

export default createBoard;
