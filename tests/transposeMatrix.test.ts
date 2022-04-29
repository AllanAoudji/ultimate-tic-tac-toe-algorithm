import {Tile, TileState} from '@src/types';
import mapMatrix from '@src/utils/mapMatrix';
import transposeMatrix from '@src/utils/transposeMatrix';

const EXCEPTION_MESSAGE =
  'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix';

describe('transposeMatrix', () => {
  it('should throw an error if arg is an empty array', () => {
    const emptyArray = new Array(9);

    expect(() => transposeMatrix(emptyArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 9/81 length array', () => {
    const wrongArray: TileState[] = new Array(3).fill(0);

    expect(() => transposeMatrix(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 3x3/9x9 matrix', () => {
    const wrongMatrix: Tile[][] = new Array(8).fill(new Array(10));

    expect(() => transposeMatrix(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a square matrix', () => {
    const wrongMatrix: Tile[][] = new Array(9).fill(new Array(10));

    expect(() => transposeMatrix(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg matrix is not a matrix of tiles', () => {
    const wrongMatrix1: any[][] = new Array(3).fill(new Array(3).fill(0));
    const wrongMatrix2: any[][] = new Array(3).fill(new Array(3).fill({}));
    const wrongMatrix3: any[][] = new Array(9).fill(new Array(9).fill(0));
    const wrongMatrix4: any[][] = new Array(9).fill(new Array(9).fill({}));

    expect(() => transposeMatrix(wrongMatrix1)).toThrow(
      'matrix arg should be a matrix of tile',
    );
    expect(() => transposeMatrix(wrongMatrix2)).toThrow(
      'matrix arg should be a matrix of tile',
    );
    expect(() => transposeMatrix(wrongMatrix3)).toThrow(
      'matrix arg should be a matrix of tile',
    );
    expect(() => transposeMatrix(wrongMatrix4)).toThrow(
      'matrix arg should be a matrix of tile',
    );
  });

  it('should throw an error if arg array is not an array of TileState', () => {
    const wrongArray1 = new Array(9).fill(true);
    const wrongArray2 = new Array(81).fill(true);

    expect(() => transposeMatrix(wrongArray1)).toThrow(
      'array arg should be an array of tileState',
    );
    expect(() => transposeMatrix(wrongArray2)).toThrow(
      'array arg should be an array of tileState',
    );
  });

  it('should transpose a matrix', () => {
    const matrix3x3 = [
      [TileState.Empty, TileState.Player1, TileState.Player2],
      [TileState.Player1, TileState.Player2, TileState.Empty],
      [TileState.Player2, TileState.Empty, TileState.Player1],
    ];
    const matrix3x3Tile = mapMatrix(matrix3x3, (item) => ({
      state: item,
      index1D: 0,
    }));
    const transposedMatrix3x3 = transposeMatrix(matrix3x3Tile);

    expect(transposedMatrix3x3[0][0].state).toBe(matrix3x3[0][0]);
    expect(transposedMatrix3x3[0][1].state).toBe(matrix3x3[1][0]);
    expect(transposedMatrix3x3[0][2].state).toBe(matrix3x3[2][0]);
    expect(transposedMatrix3x3[1][0].state).toBe(matrix3x3[0][1]);
    expect(transposedMatrix3x3[1][1].state).toBe(matrix3x3[1][1]);
    expect(transposedMatrix3x3[1][2].state).toBe(matrix3x3[2][1]);
    expect(transposedMatrix3x3[2][0].state).toBe(matrix3x3[0][2]);
    expect(transposedMatrix3x3[2][1].state).toBe(matrix3x3[1][2]);
    expect(transposedMatrix3x3[2][2].state).toBe(matrix3x3[2][2]);
  });

  it('should transpose a 1D array', () => {
    const array1d9 = [
      TileState.Empty,
      TileState.Player1,
      TileState.Player2,
      TileState.Player1,
      TileState.Player2,
      TileState.Empty,
      TileState.Player2,
      TileState.Empty,
      TileState.Player1,
    ];

    const transposedMatrix3x3 = transposeMatrix(array1d9);

    expect(transposedMatrix3x3[0][0].state).toBe(array1d9[0]);
    expect(transposedMatrix3x3[0][1].state).toBe(array1d9[3]);
    expect(transposedMatrix3x3[0][2].state).toBe(array1d9[6]);
    expect(transposedMatrix3x3[1][0].state).toBe(array1d9[1]);
    expect(transposedMatrix3x3[1][1].state).toBe(array1d9[4]);
    expect(transposedMatrix3x3[1][2].state).toBe(array1d9[7]);
    expect(transposedMatrix3x3[2][0].state).toBe(array1d9[2]);
    expect(transposedMatrix3x3[2][1].state).toBe(array1d9[5]);
    expect(transposedMatrix3x3[2][2].state).toBe(array1d9[8]);
  });
});
