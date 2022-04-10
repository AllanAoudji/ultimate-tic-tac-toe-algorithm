import checkIfSectionIsFull from '@src/utils/checkIfSectionIsFull';

const EXCEPTION_MESSAGE = 'arg should be a 9 length array or a 3x3 matrix';

describe('checkIfSectionIsFull', () => {
  it('should throw an error if arg is an empty array', () => {
    const emptyArray = new Array(9);

    expect(() => checkIfSectionIsFull(emptyArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 9 length array', () => {
    const wrongArray = new Array(8).fill(BoardState.Empty);

    expect(() => checkIfSectionIsFull(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 3x3 matrix', () => {
    const wrongMatrix1 = new Array(2).fill(new Array(3).fill(BoardState.Empty));
    const wrongMatrix2 = new Array(3).fill(new Array(2).fill(BoardState.Empty));

    expect(() => checkIfSectionIsFull(wrongMatrix1)).toThrow(EXCEPTION_MESSAGE);
    expect(() => checkIfSectionIsFull(wrongMatrix2)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg matrix is not a matrix of tiles', () => {
    const wrongMatrix1: any[][] = new Array(9).fill(new Array(9).fill(0));
    const wrongMatrix2: any[][] = new Array(9).fill(new Array(9).fill({}));

    expect(() => checkIfSectionIsFull(wrongMatrix1)).toThrow(
      'matrix arg should be a matrix of tile',
    );
    expect(() => checkIfSectionIsFull(wrongMatrix2)).toThrow(
      'matrix arg should be a matrix of tile',
    );
  });

  it('should throw an error if arg array is not an array of BoardState', () => {
    const wrongArray = new Array(9).fill(true);

    expect(() => checkIfSectionIsFull(wrongArray)).toThrow(
      'array arg should be an array of boardState',
    );
  });

  it('should return true if each tile === Player_1 or Player_2', () => {
    const matrixOfBoardState = [
      [BoardState.Player1, BoardState.Player2, BoardState.Player1],
      [BoardState.Player2, BoardState.Player1, BoardState.Player2],
      [BoardState.Player1, BoardState.Player2, BoardState.Player1],
    ];
    const matrixOfTile = matrixOfBoardState.map((row) =>
      row.map((tile) => ({state: tile, position1D: 0})),
    );

    expect(checkIfSectionIsFull(matrixOfTile)).toBe(true);
  });

  it('should work with a 1D array', () => {
    const array1D = [
      BoardState.Player1,
      BoardState.Player2,
      BoardState.Player1,
      BoardState.Player2,
      BoardState.Player1,
      BoardState.Player2,
      BoardState.Player1,
      BoardState.Player2,
      BoardState.Player1,
    ];

    expect(checkIfSectionIsFull(array1D)).toBe(true);
  });

  it('should return false if at least 1 tile === Empty', () => {
    const tests = [
      [
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Empty,
        BoardState.Player1,
        BoardState.Empty,
        BoardState.Player1,
      ],
      [
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Empty,
        BoardState.Player1,
      ],
      [
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Empty,
        BoardState.Player1,
      ],
      [
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Player1,
      ],
      [
        BoardState.Empty,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Player1,
        BoardState.Player2,
        BoardState.Player1,
      ],
    ];

    tests.forEach((test) => {
      expect(checkIfSectionIsFull(test)).toBe(false);
    });
  });
});
