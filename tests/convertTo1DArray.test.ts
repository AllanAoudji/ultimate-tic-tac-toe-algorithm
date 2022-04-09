import convertTo1DArray from '@src/utils/convertTo1DArray';

const expectionMessage = 'arg should be a 3x3 or a 9x9 matrix';

describe('convertTo1DArray', () => {
  it('should throw an error if arg is not a 3x3 array', () => {
    const wrongArray3x2 = new Array(3).fill(
      new Array(2).fill(BoardState.Empty),
    );
    const wrongArray2x3 = new Array(2).fill(
      new Array(3).fill(BoardState.Empty),
    );

    expect(() => convertTo1DArray(wrongArray3x2)).toThrow(expectionMessage);
    expect(() => convertTo1DArray(wrongArray2x3)).toThrow(expectionMessage);
  });

  it('should throw an error if arg is not a 9x9 array', () => {
    const wrongArray9x8 = new Array(9).fill(
      new Array(8).fill(BoardState.Empty),
    );
    const wrongArray8x9 = new Array(8).fill(
      new Array(9).fill(BoardState.Empty),
    );

    expect(() => convertTo1DArray(wrongArray9x8)).toThrow(expectionMessage);
    expect(() => convertTo1DArray(wrongArray8x9)).toThrow(expectionMessage);
  });

  it('should convert a 9x9 2D array to a 1D array with a length of 81', () => {
    const shape = 9;
    const array2D: BoardState[][] = new Array(shape).fill(
      new Array(shape).fill(BoardState.Empty),
    );
    const array1D = convertTo1DArray(array2D);

    expect(array1D.length).toBe(shape * shape);
    array1D.forEach((item) => {
      expect(item).toBe(BoardState.Empty);
    });
  });

  it('should convert a 3x3 2D array to a 1D array with a length of 9', () => {
    const shape = 3;
    const array2D: BoardState[][] = new Array(shape).fill(
      new Array(shape).fill(BoardState.Empty),
    );
    const array1D = convertTo1DArray(array2D);

    expect(array1D.length).toBe(shape * shape);
    array1D.forEach((item) => {
      expect(item).toBe(BoardState.Empty);
    });
  });

  it('should keep the order', () => {
    const array2D = [
      [BoardState.Empty, BoardState.X, BoardState.Y],
      [BoardState.Y, BoardState.Empty, BoardState.X],
      [BoardState.X, BoardState.Y, BoardState.Empty],
    ];
    const array1D = convertTo1DArray(array2D);

    expect(array1D[0]).toBe(array2D[0][0]);
    expect(array1D[1]).toBe(array2D[0][1]);
    expect(array1D[2]).toBe(array2D[0][2]);
    expect(array1D[3]).toBe(array2D[1][0]);
    expect(array1D[4]).toBe(array2D[1][1]);
    expect(array1D[5]).toBe(array2D[1][2]);
    expect(array1D[6]).toBe(array2D[2][0]);
    expect(array1D[7]).toBe(array2D[2][1]);
    expect(array1D[8]).toBe(array2D[2][2]);
  });
});
