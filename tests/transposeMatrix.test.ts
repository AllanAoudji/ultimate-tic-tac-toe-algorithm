import transposeMatrix from '@src/utils/transposeMatrix';

const EXCEPTION_MESSAGE =
  'arg should be a 9 or 81 length array or a 3x3 or 9x9 matrix';

describe('transposeMatrix', () => {
  it('should throw an error if arg is not a 9/81 length array', () => {
    const wrongArray: BoardState[] = new Array(3).fill(0);

    expect(() => transposeMatrix(wrongArray)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should throw an error if arg is not a 3x3/9x9 matrix', () => {
    const wrongMatrix: BoardState[][] = new Array(8).fill(new Array(10));

    expect(() => transposeMatrix(wrongMatrix)).toThrow(EXCEPTION_MESSAGE);
  });

  it('should transpose a matrix', () => {
    const matrix3x3 = new Array(3).fill(new Array(3).fill(Math.random()));
    const transposedMatrix3x3 = transposeMatrix(matrix3x3);

    expect(transposedMatrix3x3[0][0]).toBe(matrix3x3[0][0]);
    expect(transposedMatrix3x3[0][1]).toBe(matrix3x3[1][0]);
    expect(transposedMatrix3x3[0][2]).toBe(matrix3x3[2][0]);
    expect(transposedMatrix3x3[1][0]).toBe(matrix3x3[0][1]);
    expect(transposedMatrix3x3[1][1]).toBe(matrix3x3[1][1]);
    expect(transposedMatrix3x3[1][2]).toBe(matrix3x3[2][1]);
    expect(transposedMatrix3x3[2][0]).toBe(matrix3x3[0][2]);
    expect(transposedMatrix3x3[2][1]).toBe(matrix3x3[1][2]);
    expect(transposedMatrix3x3[2][2]).toBe(matrix3x3[2][2]);
  });

  it('should transpose a 1D array', () => {
    const array1d9 = new Array(9).fill(Math.random());

    const transposedMatrix3x3 = transposeMatrix(array1d9);

    // 0 1 2
    // 3 4 5
    // 6 7 8

    expect(transposedMatrix3x3[0][0]).toBe(array1d9[0]);
    expect(transposedMatrix3x3[0][1]).toBe(array1d9[3]);
    expect(transposedMatrix3x3[0][2]).toBe(array1d9[6]);
    expect(transposedMatrix3x3[1][0]).toBe(array1d9[1]);
    expect(transposedMatrix3x3[1][1]).toBe(array1d9[4]);
    expect(transposedMatrix3x3[1][2]).toBe(array1d9[7]);
    expect(transposedMatrix3x3[2][0]).toBe(array1d9[2]);
    expect(transposedMatrix3x3[2][1]).toBe(array1d9[5]);
    expect(transposedMatrix3x3[2][2]).toBe(array1d9[8]);
  });
});
