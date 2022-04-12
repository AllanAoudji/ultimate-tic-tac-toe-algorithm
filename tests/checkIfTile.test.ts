import checkIfTile from '@src/utils/checkIfTile';

describe('checkIfTile', () => {
  it('should return true if arg is a tile', () => {
    const tile: Tile = {
      position1D: 1,
      state: TileState.Empty,
    };

    expect(checkIfTile(tile)).toBe(true);
  });

  it('should return false if arg is not a tile', () => {
    const notATiles = [
      {
        position1D: '1',
        state: TileState.Empty,
      },
      {
        position1D: 1,
        state: 'not a state',
      },
      {
        position2D: 1,
        state: TileState.Player1,
      },
      {
        position1D: 1,
        status: TileState.Player2,
      },
      {
        position1D: 1,
        state: TileState.Player1,
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
