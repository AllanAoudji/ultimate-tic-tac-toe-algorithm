import getIndex1DFrom2D from '@src/utils/getIndex1DFrom2D';

describe('getIndex1DFrom2D', () => {
  it('should throw an error if position is out of bound', () => {
    expect(() => getIndex1DFrom2D({x: 9, y: 0})).toThrow(
      'position out of bound',
    );
  });

  it('should get the 1D position of a 2D position', () => {
    expect(getIndex1DFrom2D({x: 0, y: 0}, 4)).toBe(0);
    expect(getIndex1DFrom2D({x: 1, y: 0}, 4)).toBe(1);
    expect(getIndex1DFrom2D({x: 2, y: 0}, 4)).toBe(2);
    expect(getIndex1DFrom2D({x: 3, y: 0}, 4)).toBe(3);

    expect(getIndex1DFrom2D({x: 0, y: 1}, 4)).toBe(4);
    expect(getIndex1DFrom2D({x: 1, y: 1}, 4)).toBe(5);
    expect(getIndex1DFrom2D({x: 2, y: 1}, 4)).toBe(6);
    expect(getIndex1DFrom2D({x: 3, y: 1}, 4)).toBe(7);

    expect(getIndex1DFrom2D({x: 0, y: 2}, 4)).toBe(8);
    expect(getIndex1DFrom2D({x: 1, y: 2}, 4)).toBe(9);
    expect(getIndex1DFrom2D({x: 2, y: 2}, 4)).toBe(10);
    expect(getIndex1DFrom2D({x: 3, y: 2}, 4)).toBe(11);

    expect(getIndex1DFrom2D({x: 0, y: 3}, 4)).toBe(12);
    expect(getIndex1DFrom2D({x: 1, y: 3}, 4)).toBe(13);
    expect(getIndex1DFrom2D({x: 2, y: 3}, 4)).toBe(14);
    expect(getIndex1DFrom2D({x: 3, y: 3}, 4)).toBe(15);
  });
});
