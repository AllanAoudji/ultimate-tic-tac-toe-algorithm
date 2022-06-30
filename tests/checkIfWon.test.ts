import {Tile, TileState, WinningLine} from '@src/types';
import checkIfWon from '@src/utils/checkIfWon';
import * as transposeMatrix from '@src/utils/transposeMatrix';

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
    const wrongSections: any[] = [
      new Array(8),
      new Array(2).fill(new Array(3)),
      new Array(3).fill(new Array(2)),
      new Array(3).fill(new Array(3).fill(false)),
      new Array(3).fill(new Array(3).fill({})),
      new Array(9).fill(true),
    ];

    wrongSections.forEach((wrongSection) => {
      expect(() => checkIfWon(wrongSection)).toThrow(
        'section should be valid.',
      );
    });
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
      WinningLine.TopRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.TopRow,
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
      WinningLine.MiddleRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.MiddleRow,
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
      WinningLine.BottomRow,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.BottomRow,
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
      WinningLine.LeftColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.LeftColumn,
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
      WinningLine.MiddleColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.MiddleColumn,
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
      WinningLine.RightColumn,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.RightColumn,
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
      WinningLine.TopLeftBottomRightDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.TopLeftBottomRightDiagonal,
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
      WinningLine.TopRightBottomLeftDiagonal,
    ]);
    expect(checkIfWon(winBoardPlayer2)).toEqual([
      TileState.Player2,
      WinningLine.TopRightBottomLeftDiagonal,
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

  it('should return [TileState.Empty, null] if there is less than 3 Player1 moves in the section', () => {
    jest.spyOn(transposeMatrix, 'default');
    const section = [
      TileState.Player1,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Player1,
      TileState.Empty,
    ];
    expect(checkIfWon(section)).toEqual([TileState.Empty, null]);
    expect(transposeMatrix.default).not.toHaveBeenCalled();
    jest.spyOn(transposeMatrix, 'default').mockClear();
  });

  it('should return [TileState.Empty, null] if there is less than 3 Player2 moves in the section', () => {
    jest.spyOn(transposeMatrix, 'default');
    const section = [
      TileState.Player2,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Empty,
      TileState.Player2,
      TileState.Empty,
    ];
    expect(checkIfWon(section)).toEqual([TileState.Empty, null]);
    expect(transposeMatrix.default).not.toHaveBeenCalled();
    jest.spyOn(transposeMatrix, 'default').mockClear();
  });
});
