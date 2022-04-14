import getIndex2DFrom1D from '@src/utils/getIndex2DFrom1D';

describe('getIndex2DFrom1D', () => {
  it('should throw error if position is out of bound', () => {
    expect(() => getIndex2DFrom1D(90)).toThrow('position out of bound');
  });

  it('should get th 2D position of a 1D position', () => {
    expect(getIndex2DFrom1D(0, 4)).toEqual({x: 0, y: 0});
    expect(getIndex2DFrom1D(1, 4)).toEqual({x: 1, y: 0});
    expect(getIndex2DFrom1D(2, 4)).toEqual({x: 2, y: 0});
    expect(getIndex2DFrom1D(3, 4)).toEqual({x: 3, y: 0});

    expect(getIndex2DFrom1D(4, 4)).toEqual({x: 0, y: 1});
    expect(getIndex2DFrom1D(5, 4)).toEqual({x: 1, y: 1});
    expect(getIndex2DFrom1D(6, 4)).toEqual({x: 2, y: 1});
    expect(getIndex2DFrom1D(7, 4)).toEqual({x: 3, y: 1});

    expect(getIndex2DFrom1D(8, 4)).toEqual({x: 0, y: 2});
    expect(getIndex2DFrom1D(9, 4)).toEqual({x: 1, y: 2});
    expect(getIndex2DFrom1D(10, 4)).toEqual({x: 2, y: 2});
    expect(getIndex2DFrom1D(11, 4)).toEqual({x: 3, y: 2});

    expect(getIndex2DFrom1D(12, 4)).toEqual({x: 0, y: 3});
    expect(getIndex2DFrom1D(13, 4)).toEqual({x: 1, y: 3});
    expect(getIndex2DFrom1D(14, 4)).toEqual({x: 2, y: 3});
    expect(getIndex2DFrom1D(15, 4)).toEqual({x: 3, y: 3});
  });
});
