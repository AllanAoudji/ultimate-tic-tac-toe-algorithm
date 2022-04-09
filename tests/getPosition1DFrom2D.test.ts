import getPosition1DFrom2D from '@src/utils/getPosition1DFrom2D';

describe('getPosition1DFrom2D', () => {
  it('should throw an error if position is out of bound', () => {
    expect(() => getPosition1DFrom2D({x: 9, y: 0})).toThrow(
      'position out of bound',
    );
  });

  it('should get the 1D position of a 2D position', () => {
    expect(getPosition1DFrom2D({x: 0, y: 0}, 4)).toBe(0);
    expect(getPosition1DFrom2D({x: 1, y: 0}, 4)).toBe(1);
    expect(getPosition1DFrom2D({x: 2, y: 0}, 4)).toBe(2);
    expect(getPosition1DFrom2D({x: 3, y: 0}, 4)).toBe(3);

    expect(getPosition1DFrom2D({x: 0, y: 1}, 4)).toBe(4);
    expect(getPosition1DFrom2D({x: 1, y: 1}, 4)).toBe(5);
    expect(getPosition1DFrom2D({x: 2, y: 1}, 4)).toBe(6);
    expect(getPosition1DFrom2D({x: 3, y: 1}, 4)).toBe(7);

    expect(getPosition1DFrom2D({x: 0, y: 2}, 4)).toBe(8);
    expect(getPosition1DFrom2D({x: 1, y: 2}, 4)).toBe(9);
    expect(getPosition1DFrom2D({x: 2, y: 2}, 4)).toBe(10);
    expect(getPosition1DFrom2D({x: 3, y: 2}, 4)).toBe(11);

    expect(getPosition1DFrom2D({x: 0, y: 3}, 4)).toBe(12);
    expect(getPosition1DFrom2D({x: 1, y: 3}, 4)).toBe(13);
    expect(getPosition1DFrom2D({x: 2, y: 3}, 4)).toBe(14);
    expect(getPosition1DFrom2D({x: 3, y: 3}, 4)).toBe(15);
  });
});
