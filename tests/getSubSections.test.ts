import getSubSections from '@src/utils/getSubSections';

describe('getSubSections', () => {
  it('should throw an error if arg is not a 9x9 matrix', () => {
    const wrongBoard8x9 = new Array(8).fill(
      new Array(9).fill(BoardState.Empty),
    );
    const wrongBoard9x8 = new Array(9).fill(
      new Array(8).fill(BoardState.Empty),
    );
    const exceptionMessage = 'arg should be an array with a length of 81';

    expect(() => getSubSections(wrongBoard8x9)).toThrow(exceptionMessage);
    expect(() => getSubSections(wrongBoard9x8)).toThrow(exceptionMessage);
  });

  it('should return an 9x3x3 matrix', () => {
    const board: BoardState[][] = new Array(9).fill(
      new Array(9).fill(BoardState.Empty),
    );
    const subSections = getSubSections(board);

    expect(subSections.length).toBe(9);
    subSections.forEach((subSection) => {
      expect(subSection.length).toBe(3);
      subSection.forEach((rows) => {
        expect(rows.length).toBe(3);
      });
    });
  });

  it('should keep the order', () => {
    const board: BoardState[][] = new Array(9).fill(
      Array.from(Array(9).keys()),
    );
    const subSections = getSubSections(board);

    expect(subSections[0][0][0]).toBe(board[0][0]);
    expect(subSections[0][2][2]).toBe(board[1][2]);
    expect(subSections[1][0][0]).toBe(board[0][3]);
    expect(subSections[1][2][2]).toBe(board[2][5]);
    expect(subSections[2][0][0]).toBe(board[0][6]);
    expect(subSections[2][2][2]).toBe(board[2][8]);
    expect(subSections[3][0][0]).toBe(board[4][0]);
    expect(subSections[3][2][2]).toBe(board[6][2]);
    expect(subSections[4][0][0]).toBe(board[3][3]);
    expect(subSections[4][2][2]).toBe(board[5][5]);
    expect(subSections[5][0][0]).toBe(board[3][6]);
    expect(subSections[5][2][2]).toBe(board[5][8]);
    expect(subSections[6][0][0]).toBe(board[6][0]);
    expect(subSections[6][2][2]).toBe(board[8][2]);
    expect(subSections[7][0][0]).toBe(board[6][3]);
    expect(subSections[7][2][2]).toBe(board[8][5]);
    expect(subSections[8][0][0]).toBe(board[6][6]);
    expect(subSections[8][2][2]).toBe(board[8][8]);
  });
});
