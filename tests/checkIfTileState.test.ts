import {TileState} from '@src/types';
import checkIfTileState from '@src/utils/checkIfTileState';

describe('checkIfTileState', () => {
  it('should return true if arg is a tileState', () => {
    const tileStates = [TileState.Empty, TileState.Player1, TileState.Player2];

    tileStates.forEach((tileState) => {
      expect(checkIfTileState(tileState)).toBe(true);
    });
  });

  it('should return false if arg is not a tileState', () => {
    const notTileState = [
      'string',
      false,
      [TileState.Empty],
      {
        state: TileState.Empty,
        index1D: 1,
      },
    ];

    notTileState.forEach((notTileState) => {
      expect(checkIfTileState(notTileState)).toBe(false);
    });
  });
});
