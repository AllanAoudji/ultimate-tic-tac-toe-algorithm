import checkIfTile from '@src/utils/checkIfTile';

describe('checkIfTile', () => {
  it('should return true if arg is a tile', () => {
    const tile: Tile = {
      position1D: 1,
      state: BoardState.Empty,
    };

    expect(checkIfTile(tile)).toBe(true);
  });

  it('should return false if arg is not a tile', () => {
    const notATiles = [
      {
        position1D: '1',
        state: BoardState.Empty,
      },
      {
        position1D: 1,
        state: 'not a state',
      },
      {
        position2D: 1,
        state: BoardState.Player1,
      },
      {
        position1D: 1,
        status: BoardState.Player2,
      },
      {
        position1D: 1,
        state: BoardState.Player1,
        other: true,
      },
      'string',
      true,
      1,
      [],
      {},
    ];

    notATiles.forEach((notATile) => {
      expect(checkIfTile(notATile)).toBe(false);
    });
  });
});
