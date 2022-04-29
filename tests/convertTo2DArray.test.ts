import {TileState} from '@src/types';
import convertTo2DArray from '@src/utils/convertTo2DArray';

describe('convertTo2DArray', () => {
  it('should return an exception if arg is an empty array', () => {
    const emptyArray = new Array(9);

    expect(() => convertTo2DArray(emptyArray)).toThrow(
      'argument should be an array with a length of 9 or 81',
    );
  });

  it('should return an exception if arg is not 9/81-length array', () => {
    const wrongArray: TileState[] = new Array(6).fill(TileState.Empty);

    expect(() => convertTo2DArray(wrongArray)).toThrow(
      'argument should be an array with a length of 9 or 81',
    );
  });

  it('should convert a 81-length array to a 9x9 2D array', () => {
    const array1D: TileState[] = new Array(81).fill(TileState.Empty);
    const array2D = convertTo2DArray(array1D);

    expect(convertTo2DArray(array1D).length).toBe(9);
    array2D.forEach((row) => {
      expect(row.length).toBe(9);
    });
  });

  it('should convert a 9-length array to a 3x3 2D array', () => {
    const array1D: TileState[] = new Array(9).fill(TileState.Empty);
    const array2D = convertTo2DArray(array1D);

    expect(convertTo2DArray(array1D).length).toBe(3);
    array2D.forEach((row) => {
      expect(row.length).toBe(3);
    });
  });

  it('should store 1D position', () => {
    const array1D9: TileState[] = new Array(9).fill(TileState.Empty);
    const array2D3x3 = convertTo2DArray(array1D9);

    expect(array2D3x3[0][0].index1D).toBe(0);
    expect(array2D3x3[0][1].index1D).toBe(1);
    expect(array2D3x3[0][2].index1D).toBe(2);

    expect(array2D3x3[1][0].index1D).toBe(3);
    expect(array2D3x3[1][1].index1D).toBe(4);
    expect(array2D3x3[1][2].index1D).toBe(5);

    expect(array2D3x3[2][0].index1D).toBe(6);
    expect(array2D3x3[2][1].index1D).toBe(7);
    expect(array2D3x3[2][2].index1D).toBe(8);
  });

  it('should keep order', () => {
    const array1D81: TileState[] = new Array(81).fill(TileState.Empty);
    const array1D9: TileState[] = new Array(81).fill(TileState.Empty);
    const array2D9x9 = convertTo2DArray(array1D81);
    const array2D3x3 = convertTo2DArray(array1D9);

    expect(array2D9x9[0][0].state).toBe(array1D81[0]);
    expect(array2D9x9[1][0].state).toBe(array1D81[9]);
    expect(array2D9x9[1][1].state).toBe(array1D81[10]);
    expect(array2D9x9[2][0].state).toBe(array1D81[18]);

    expect(array2D3x3[0][0].state).toBe(array1D9[0]);
    expect(array2D3x3[1][0].state).toBe(array1D9[3]);
    expect(array2D3x3[2][0].state).toBe(array1D9[6]);
  });
});
