import getTileSection from '@src/utils/getTileSection';

describe('getTileSection', () => {
  it('should throw an error if position is out of bound', () => {
    const wrongPosition = 81;

    expect(() => getTileSection(wrongPosition)).toThrow(
      'position out of bound',
    );
  });
  it('should return proper index section', () => {
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
      expect(getTileSection(test[0])).toBe(test[1]);
    });
  });
});
