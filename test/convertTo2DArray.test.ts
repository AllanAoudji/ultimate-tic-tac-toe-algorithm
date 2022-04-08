import convertTo2DArray from '@src/utils/convertTo2DArray';

describe('convertTo2DArray', () => {
  it("should return an exception if it's not 9/81-length array", () => {
    const wrongArray: number[] = new Array(6).fill(0);

    expect(() => convertTo2DArray(wrongArray)).toThrow(
      'argument should be an array with a length of 9 or 81',
    );
  });

  it('should convert a 81-length array to a 9x9 2D array', () => {
    const array1D: number[] = new Array(81).fill(0);
    const array2D = convertTo2DArray(array1D);

    expect(convertTo2DArray(array1D).length).toBe(9);
    array2D.forEach((row) => {
      expect(row.length).toBe(9);
    });
  });

  it('should convert a 9-length array to a 3x3 2D array', () => {
    const array1D: number[] = new Array(9).fill(0);
    const array2D = convertTo2DArray(array1D);

    expect(convertTo2DArray(array1D).length).toBe(3);
    array2D.forEach((row) => {
      expect(row.length).toBe(3);
    });
  });

  it('should keep order', () => {
    const array1D81 = Array.from(Array(81).keys());
    const array2D9x9 = convertTo2DArray(array1D81);
    const array1D9 = Array.from(Array(9).keys());
    const array2D3x3 = convertTo2DArray(array1D9);

    expect(array2D9x9[0][0]).toBe(array1D81[0]);
    expect(array2D9x9[1][0]).toBe(array1D81[9]);
    expect(array2D9x9[1][1]).toBe(array1D81[10]);
    expect(array2D9x9[2][0]).toBe(array1D81[18]);

    expect(array2D3x3[0][0]).toBe(array1D9[0]);
    expect(array2D3x3[1][0]).toBe(array1D9[3]);
    expect(array2D3x3[2][0]).toBe(array1D9[6]);
  });
});
