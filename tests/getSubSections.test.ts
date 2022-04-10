import convertTo2DArray from '@src/utils/convertTo2DArray';
import createBoard from '@src/utils/createBoard';
import getSubSections from '@src/utils/getSubSections';

const EXCEPTION_MESSAGE = 'arg should be a 81 length array or a 9x9 matrix';

describe('getSubSections', () => {
  it('should throw an error if arg is an empty array', () => {
    const emptyArray = new Array(9);

    expect(() => getSubSections(emptyArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 9x9 matrix', () => {
    const wrongBoard8x9 = new Array(8).fill(
      new Array(9).fill(BoardState.Empty),
    );
    const wrongBoard9x8 = new Array(9).fill(
      new Array(8).fill(BoardState.Empty),
    );

    expect(() => getSubSections(wrongBoard8x9)).toThrow(EXCEPTION_MESSAGE);
    expect(() => getSubSections(wrongBoard9x8)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if an 1D array has not a length of 81', () => {
    const wrongArray = new Array(78).fill(BoardState.Empty);

    expect(() => getSubSections(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg matrix is not a matrix of tiles', () => {
    const wrongMatrix1: any[][] = new Array(9).fill(new Array(9).fill(0));
    const wrongMatrix2: any[][] = new Array(9).fill(new Array(9).fill({}));

    expect(() => getSubSections(wrongMatrix1)).toThrow(
      'matrix board should be a matrix of tile',
    );
    expect(() => getSubSections(wrongMatrix2)).toThrow(
      'matrix board should be a matrix of tile',
    );
  });

  it('should throw an error if arg array is not an array of BoardState', () => {
    const wrongArray = new Array(81).fill(true);

    expect(() => getSubSections(wrongArray)).toThrow(
      'array board should be an array of boardState',
    );
  });

  it('should work with an 1D array of length 81', () => {
    const array1D81 = new Array(81).fill(BoardState.Empty);
    const subSections = getSubSections(array1D81);

    expect(subSections.length).toBe(9);
    subSections.forEach((subSection) => {
      expect(subSection.tiles.length).toBe(3);
      subSection.tiles.forEach((rows) => {
        expect(rows.length).toBe(3);
      });
    });
  });

  it('should return an 9x3x3 matrix', () => {
    const board: BoardState[] = new Array(81).fill(BoardState.Empty);
    const subSections = getSubSections(convertTo2DArray(board));

    expect(subSections.length).toBe(9);
    subSections.forEach((subSection) => {
      expect(subSection.tiles.length).toBe(3);
      subSection.tiles.forEach((rows) => {
        expect(rows.length).toBe(3);
      });
    });
  });

  it('should keep the order', () => {
    const board1D: BoardState[] = new Array(81).fill(BoardState.Empty);
    const board2D = convertTo2DArray(board1D);
    const subSections = getSubSections(board2D);

    expect(subSections[0].tiles[0][0].state).toBe(board2D[0][0].state);
    expect(subSections[0].tiles[2][2].state).toBe(board2D[1][2].state);
    expect(subSections[1].tiles[0][0].state).toBe(board2D[0][3].state);
    expect(subSections[1].tiles[2][2].state).toBe(board2D[2][5].state);
    expect(subSections[2].tiles[0][0].state).toBe(board2D[0][6].state);
    expect(subSections[2].tiles[2][2].state).toBe(board2D[2][8].state);
    expect(subSections[3].tiles[0][0].state).toBe(board2D[4][0].state);
    expect(subSections[3].tiles[2][2].state).toBe(board2D[6][2].state);
    expect(subSections[4].tiles[0][0].state).toBe(board2D[3][3].state);
    expect(subSections[4].tiles[2][2].state).toBe(board2D[5][5].state);
    expect(subSections[5].tiles[0][0].state).toBe(board2D[3][6].state);
    expect(subSections[5].tiles[2][2].state).toBe(board2D[5][8].state);
    expect(subSections[6].tiles[0][0].state).toBe(board2D[6][0].state);
    expect(subSections[6].tiles[2][2].state).toBe(board2D[8][2].state);
    expect(subSections[7].tiles[0][0].state).toBe(board2D[6][3].state);
    expect(subSections[7].tiles[2][2].state).toBe(board2D[8][5].state);
    expect(subSections[8].tiles[0][0].state).toBe(board2D[6][6].state);
    expect(subSections[8].tiles[2][2].state).toBe(board2D[8][8].state);
  });

  it('should return proper position', () => {
    const board = createBoard();
    const subSections = getSubSections(board);

    expect(subSections[0].position).toBe(Position.TopLeft);
    expect(subSections[1].position).toBe(Position.TopMiddle);
    expect(subSections[2].position).toBe(Position.TopRight);

    expect(subSections[3].position).toBe(Position.MiddleLeft);
    expect(subSections[4].position).toBe(Position.MiddleMiddle);
    expect(subSections[5].position).toBe(Position.MiddleRight);

    expect(subSections[6].position).toBe(Position.BottomLeft);
    expect(subSections[7].position).toBe(Position.BottomMiddle);
    expect(subSections[8].position).toBe(Position.BottomRight);
  });
});
