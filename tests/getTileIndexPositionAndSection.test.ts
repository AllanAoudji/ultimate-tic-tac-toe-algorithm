import getTileIndexPositionAndSection from '@src/utils/getTileIndexPositionAndSection';

describe('getTileIndexPositionAndSection', () => {
  it('should throw an error if position is out of bound', () => {
    const wrongPosition = 81;

    expect(() => getTileIndexPositionAndSection(wrongPosition)).toThrow(
      'position out of bound',
    );
  });

  it('should return proper index', () => {
    const tests = [
      [0, 0],
      [20, 8],
      [3, 0],
      [23, 8],
      [6, 0],
      [26, 8],
      [29, 2],
      [45, 6],
      [32, 2],
      [48, 6],
    ];

    tests.forEach((test) => {
      expect(getTileIndexPositionAndSection(test[0]).index).toBe(test[1]);
    });
  });

  it('should return proper position', () => {
    const tests = [
      [1, Position.TopMiddle],
      [9, Position.MiddleLeft],
      [11, Position.MiddleRight],
      [19, Position.BottomMiddle],
      [60, Position.TopLeft],
      [62, Position.TopRight],
      [70, Position.MiddleMiddle],
      [78, Position.BottomLeft],
      [80, Position.BottomRight],
    ];

    tests.forEach((test) => {
      expect(getTileIndexPositionAndSection(test[0]).position).toBe(test[1]);
    });
  });

  it('should return proper section', () => {
    const tests = [
      [0, 0],
      [3, 1],
      [6, 2],
      [27, 3],
      [30, 4],
      [33, 5],
      [54, 6],
      [57, 7],
      [60, 8],
    ];

    tests.forEach((test) => {
      expect(getTileIndexPositionAndSection(test[0]).section).toBe(test[1]);
    });
  });
});
