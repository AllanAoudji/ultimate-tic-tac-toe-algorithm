import getActivePlayer from '@src/utils/getActivePlayer';

describe('getActivePlayer', () => {
  it('should throw an error if arg is not a valid history', () => {
    const wrongHistories: any[] = [
      'string',
      0,
      true,
      {},
      new Array(8),
      new Array(90).fill(0),
    ];

    wrongHistories.forEach((wrongArg) => {
      expect(() => getActivePlayer(wrongArg)).toThrow(
        'arg should be a valid history',
      );
    });
  });

  it('should return first player (0) if history.length is even', () => {
    const evenHistories = [
      [],
      [1, 2],
      [1, 2, 3, 4],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ];

    evenHistories.forEach((evenHistory) => {
      expect(getActivePlayer(evenHistory)).toBe(0);
    });
  });

  it('should return second player if history.length is odd', () => {
    const oddHistories = [
      [1],
      [1, 2, 3],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5, 6, 7],
    ];

    oddHistories.forEach((oddHistory) => {
      expect(getActivePlayer(oddHistory)).toBe(1);
    });
  });
});
