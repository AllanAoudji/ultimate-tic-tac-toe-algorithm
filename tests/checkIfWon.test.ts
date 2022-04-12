import checkIfWon from '@src/utils/checkIfWon';

const EXCEPTION_MESSAGE = 'arg should be a 9 length array or a 9x9 matrix';

const converToMatrixTile: (board: TileState[][]) => Tile[][] = (board) => {
  return board.map((row) =>
    row.map((item) => ({
      state: item,
      index1D: 1,
    })),
  );
};

describe('checkIfWon', () => {
  it('should throw error if is not a 9 length array', () => {
    const wrongArray: TileState[] = new Array(8);

    expect(() => checkIfWon(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should return error if is not a 3x3 matrix', () => {
    const wrongMatrix: Tile[][] = new Array(2).fill(new Array(3));

    expect(() => checkIfWon(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if is not a square matrix', () => {
    const wrongMatrix: Tile[][] = new Array(3).fill(new Array(2));

    expect(() => checkIfWon(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg matrix is not a matrix of tiles', () => {
    const wrongMatrix1 = new Array(3).fill(new Array(3).fill(false));
    const wrongMatrix2 = new Array(3).fill(new Array(3).fill({}));

    expect(() => checkIfWon(wrongMatrix1)).toThrow(
      'matrix arg should be a matrix of tile',
    );
    expect(() => checkIfWon(wrongMatrix2)).toThrow(
      'matrix arg should be a matrix of tile',
    );
  });

  it('should throw an error if arg array is not a matrix of TileState', () => {
    const wrongArray = new Array(9).fill(true);

    expect(() => checkIfWon(wrongArray)).toThrow(
      'array arg should be an array of tileState',
    );
  });

  it('should work with an 1D array of TileState', () => {
    const array1D: TileState[] = new Array(9).fill(TileState.Empty);

    expect(checkIfWon(array1D)).toEqual([TileState.Empty, null]);
  });

  it('should return a winner if the top row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Player1, TileState.Player1, TileState.Player1],
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Player2, TileState.Player2, TileState.Player2],
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.TopRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.TopRow,
    ]);
  });

  it('should return a winner if the middle row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Player1, TileState.Player1, TileState.Player1],
      [TileState.Empty, TileState.Empty, TileState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Player2, TileState.Player2, TileState.Player2],
      [TileState.Empty, TileState.Empty, TileState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.MiddleRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.MiddleRow,
    ]);
  });

  it('should return a winner if the bottom row has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Player1, TileState.Player1, TileState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Empty],
      [TileState.Player2, TileState.Player2, TileState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.BottomRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.BottomRow,
    ]);
  });

  it('should return a winner if the left column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Player1, TileState.Empty, TileState.Empty],
      [TileState.Player1, TileState.Empty, TileState.Empty],
      [TileState.Player1, TileState.Empty, TileState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Player2, TileState.Empty, TileState.Empty],
      [TileState.Player2, TileState.Empty, TileState.Empty],
      [TileState.Player2, TileState.Empty, TileState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.LeftColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.LeftColumn,
    ]);
  });

  it('should return a winner if the middle column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Player1, TileState.Empty],
      [TileState.Empty, TileState.Player1, TileState.Empty],
      [TileState.Empty, TileState.Player1, TileState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Player2, TileState.Empty],
      [TileState.Empty, TileState.Player2, TileState.Empty],
      [TileState.Empty, TileState.Player2, TileState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.MiddleColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.MiddleColumn,
    ]);
  });

  it('should return a winner if the right column has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Player1],
      [TileState.Empty, TileState.Empty, TileState.Player1],
      [TileState.Empty, TileState.Empty, TileState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Player2],
      [TileState.Empty, TileState.Empty, TileState.Player2],
      [TileState.Empty, TileState.Empty, TileState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.RightColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.RightColumn,
    ]);
  });

  it('should return a winner if the top/left-bottom/right diagonal has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Player1, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Player1, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Player1],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Player2, TileState.Empty, TileState.Empty],
      [TileState.Empty, TileState.Player2, TileState.Empty],
      [TileState.Empty, TileState.Empty, TileState.Player2],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.TopLeftBottomRightDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.TopLeftBottomRightDiagonal,
    ]);
  });

  it('should return a winner if the top/right-bottom/left diagonal has the same symbol', () => {
    const winBoardPlayer1: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Player1],
      [TileState.Empty, TileState.Player1, TileState.Empty],
      [TileState.Player1, TileState.Empty, TileState.Empty],
    ]);
    const winBoardPlayer2: Tile[][] = converToMatrixTile([
      [TileState.Empty, TileState.Empty, TileState.Player2],
      [TileState.Empty, TileState.Player2, TileState.Empty],
      [TileState.Player2, TileState.Empty, TileState.Empty],
    ]);

    expect(checkIfWon(winBoardPlayer1)).toEqual([
      TileState.Player1,
      WiningLine.TopRightBottomLeftDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WiningLine.TopRightBottomLeftDiagonal,
    ]);
  });

  it('should return Board.Empty if there are no winner', () => {
    const tests: Tile[][][] = [
      converToMatrixTile([
        [TileState.Empty, TileState.Empty, TileState.Empty],
        [TileState.Empty, TileState.Empty, TileState.Empty],
        [TileState.Empty, TileState.Empty, TileState.Empty],
      ]),
      converToMatrixTile([
        [TileState.Empty, TileState.Empty, TileState.Player1],
        [TileState.Empty, TileState.Player2, TileState.Empty],
        [TileState.Player1, TileState.Empty, TileState.Empty],
      ]),
      converToMatrixTile([
        [TileState.Player1, TileState.Player1, TileState.Empty],
        [TileState.Player2, TileState.Player2, TileState.Player1],
        [TileState.Player1, TileState.Empty, TileState.Empty],
      ]),
      converToMatrixTile([
        [TileState.Player1, TileState.Player1, TileState.Empty],
        [TileState.Player2, TileState.Player1, TileState.Player1],
        [TileState.Player1, TileState.Player2, TileState.Empty],
      ]),
      converToMatrixTile([
        [TileState.Empty, TileState.Empty, TileState.Empty],
        [TileState.Player1, TileState.Player1, TileState.Empty],
        [TileState.Empty, TileState.Empty, TileState.Empty],
      ]),
      converToMatrixTile([
        [TileState.Empty, TileState.Empty, TileState.Player1],
        [TileState.Empty, TileState.Empty, TileState.Empty],
        [TileState.Player2, TileState.Player1, TileState.Player2],
      ]),
    ];

    tests.forEach((test) => {
      expect(checkIfWon(test)).toEqual([TileState.Empty, null]);
    });
  });
});
