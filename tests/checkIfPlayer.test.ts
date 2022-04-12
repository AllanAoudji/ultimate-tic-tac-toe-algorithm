import checkIfPlayer from '@src/utils/checkIfPlayer';

describe('checkIfPlayer', () => {
  it('should return true if arg[0] is a valid Player', () => {
    const players = [BoardState.Player1, BoardState.Player2];

    players.forEach((player) => {
      expect(checkIfPlayer(player)).toBe(true);
    });
  });

  it('should return false if arg is not a valid Player', () => {
    const notPlayer = [
      BoardState.Empty,
      'not a player',
      false,
      0,
      [BoardState.Player1],
      {
        player: BoardState.Player1,
      },
    ];

    notPlayer.forEach((player) => {
      expect(checkIfPlayer(player)).toBe(false);
    });
  });
});
