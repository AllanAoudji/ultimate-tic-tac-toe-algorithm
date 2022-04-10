import generatePlayers from '@src/utils/generatePlayers';

describe('generatePlayers', () => {
  it('should generate two players (X|O)', () => {
    const players = generatePlayers();

    expect(players.length).toBe(2);
    expect(players[0]).toBe(BoardState.Player1);
    expect(players[1]).toBe(BoardState.Player2);
  });
});
