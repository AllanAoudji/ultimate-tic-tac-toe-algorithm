import createBoard from '@src/utils/createBoard';

describe('createBoard', () => {
  it('should create an empty board', () => {
    const emptyBoard = createBoard();

    expect(emptyBoard.length).toBe(81);
    emptyBoard.forEach((tile) => {
      expect(tile).toBe(BoardState.Empty);
    });
  });
});
