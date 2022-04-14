import checkIfPlayer from '@src/utils/checkIfPlayer';

describe('checkIfPlayer', () => {
  it('should return true if arg[0] is a valid Player', () => {
    const players = [TileState.Player1, TileState.Player2];

    players.forEach((player) => {
      expect(checkIfPlayer(player)).toBe(true);
    });
  });

  it('should return false if arg is not a valid Player', () => {
    const notPlayer = [
      TileState.Empty,
      'not a player',
      false,
      0,
      [TileState.Player1],
      {
        player: TileState.Player1,
      },
    ];

    notPlayer.forEach((player) => {
      expect(checkIfPlayer(player)).toBe(false);
    });
  });
});
