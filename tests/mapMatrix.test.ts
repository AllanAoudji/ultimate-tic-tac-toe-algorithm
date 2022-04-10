import mapMatrix from '@src/utils/mapMatrix';

const THROW_MESSAGE = 'arg should be a matrix';

describe('mapMatrix', () => {
  it('should throw an error if arg is an empty array', () => {
    const emptyArray = new Array(10);

    expect(() => mapMatrix(emptyArray, () => {})).toThrow(THROW_MESSAGE);
  });

  it('should throw an error if arg is an 1D array', () => {
    const array1D = new Array(10).fill(0);

    expect(() => mapMatrix(array1D, () => {})).toThrow(THROW_MESSAGE);
  });

  it('should apply the transformation on each member of the function', () => {
    const matrix: any[][] = new Array(2).fill(new Array(2).fill(0));

    expect(mapMatrix(matrix, () => 'a')).toEqual([
      ['a', 'a'],
      ['a', 'a'],
    ]);
    expect(
      mapMatrix(
        matrix,
        (item: any, rowIndex, rowCol) => item + rowIndex + rowCol,
      ),
    ).toEqual([
      [0, 1],
      [1, 2],
    ]);
    expect(
      mapMatrix(matrix, (item) => ({
        item,
      })),
    ).toEqual([
      [{item: 0}, {item: 0}],
      [{item: 0}, {item: 0}],
    ]);
  });
});
