import checkIfWon from '@src/utils/checkIfWon';

const EXCEPTION_MESSAGE = 'arg should be a 9 length array or a 9x9 matrix';

const converToMatrixTile: (board: BoardState[][]) => Tile[][] = (board) => {
  return board.map((row) =>
    row.map((item) => ({
      state: item,
      position1D: 1,
    })),
  );
};

describe('checkIfWon', () => {
  it('should throw error if is not a 9 length array', () => {
    const wrongArray: BoardState[] = new Array(8);

    expect(() => checkIfWon(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should return error if is not a 3x3 matrix', () => {
    const wrongMatrix: Tile[][] = new Array(2).fill(new Array(3));

    expect(() => checkIfWon(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should return a winner if the top row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Player1, BoardState.Player1, BoardState.Player1],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Player2, BoardState.Player2, BoardState.Player2],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.TopRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.TopRow,
    ]);
  });

  it('should return a winner if the middle row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Player1, BoardState.Player1, BoardState.Player1],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Player2, BoardState.Player2, BoardState.Player2],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.MiddleRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.MiddleRow,
    ]);
  });

  it('should return a winner if the bottom row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Player1, BoardState.Player1, BoardState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      [BoardState.Player2, BoardState.Player2, BoardState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.BottomRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.BottomRow,
    ]);
  });

  it('should return a winner if the left column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Player1, BoardState.Empty, BoardState.Empty],
      [BoardState.Player1, BoardState.Empty, BoardState.Empty],
      [BoardState.Player1, BoardState.Empty, BoardState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Player2, BoardState.Empty, BoardState.Empty],
      [BoardState.Player2, BoardState.Empty, BoardState.Empty],
      [BoardState.Player2, BoardState.Empty, BoardState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.LeftColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.LeftColumn,
    ]);
  });

  it('should return a winner if the middle column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Player1, BoardState.Empty],
      [BoardState.Empty, BoardState.Player1, BoardState.Empty],
      [BoardState.Empty, BoardState.Player1, BoardState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Player2, BoardState.Empty],
      [BoardState.Empty, BoardState.Player2, BoardState.Empty],
      [BoardState.Empty, BoardState.Player2, BoardState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.MiddleColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.MiddleColumn,
    ]);
  });

  it('should return a winner if the right column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Player1],
      [BoardState.Empty, BoardState.Empty, BoardState.Player1],
      [BoardState.Empty, BoardState.Empty, BoardState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Player2],
      [BoardState.Empty, BoardState.Empty, BoardState.Player2],
      [BoardState.Empty, BoardState.Empty, BoardState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.RightColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.RightColumn,
    ]);
  });

  it('should return a winner if the top/left-bottom/right diagonal has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Player1, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Player1, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Player2, BoardState.Empty, BoardState.Empty],
      [BoardState.Empty, BoardState.Player2, BoardState.Empty],
      [BoardState.Empty, BoardState.Empty, BoardState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.TopLeftBottomRightDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.TopLeftBottomRightDiagonal,
    ]);
  });

  it('should return a winner if the top/right-bottom/left diagonal has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Player1],
      [BoardState.Empty, BoardState.Player1, BoardState.Empty],
      [BoardState.Player1, BoardState.Empty, BoardState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [BoardState.Empty, BoardState.Empty, BoardState.Player2],
      [BoardState.Empty, BoardState.Player2, BoardState.Empty],
      [BoardState.Player2, BoardState.Empty, BoardState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      BoardState.Player1,
      WiningLine.TopRightBottomLeftDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      BoardState.Player2,
      WiningLine.TopRightBottomLeftDiagonal,
    ]);
  });

  it('should return Board.Empty if there are no winner', () => {
    const tests: Tile[][][] = [
      converToMatrixTile([
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      ]),
      converToMatrixTile([
        [BoardState.Empty, BoardState.Empty, BoardState.Player1],
        [BoardState.Empty, BoardState.Player2, BoardState.Empty],
        [BoardState.Player1, BoardState.Empty, BoardState.Empty],
      ]),
      converToMatrixTile([
        [BoardState.Player1, BoardState.Player1, BoardState.Empty],
        [BoardState.Player2, BoardState.Player2, BoardState.Player1],
        [BoardState.Player1, BoardState.Empty, BoardState.Empty],
      ]),
      converToMatrixTile([
        [BoardState.Player1, BoardState.Player1, BoardState.Empty],
        [BoardState.Player2, BoardState.Player1, BoardState.Player1],
        [BoardState.Player1, BoardState.Player2, BoardState.Empty],
      ]),
      converToMatrixTile([
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
        [BoardState.Player1, BoardState.Player1, BoardState.Empty],
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
      ]),
      converToMatrixTile([
        [BoardState.Empty, BoardState.Empty, BoardState.Player1],
        [BoardState.Empty, BoardState.Empty, BoardState.Empty],
        [BoardState.Player2, BoardState.Player1, BoardState.Player2],
      ]),
    ];

    tests.forEach((test) => {
      expect(checkIfWon(test)).toBe(BoardState.Empty);
    });
  });
});
