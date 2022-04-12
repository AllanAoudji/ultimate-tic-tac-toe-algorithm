import checkIfBoardState from '@src/utils/checkIfBoardState';

describe('checkIfBoardState', () => {
  it('should return true if arg is a tileState', () => {
    const tileStates = [TileState.Empty, TileState.Player1, TileState.Player2];

    tileStates.forEach((tileState) => {
      expect(checkIfBoardState(tileState)).toBe(true);
    });
  });

  it('should return false if arg is not a tileState', () => {
    const notTileState = [
      'string',
      false,
      [TileState.Empty],
      {
        state: TileState.Empty,
        position1D: 1,
      },
    ];

    notTileState.forEach((notTileState) => {
      expect(checkIfBoardState(notTileState)).toBe(false);
    });
  });
});
