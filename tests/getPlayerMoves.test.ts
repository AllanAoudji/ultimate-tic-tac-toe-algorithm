import getPlayerMoves from '@src/utils/getPlayerMoves';

describe('getPlayerMove', () => {
  it('should throw an error if first arg is not a valid player', () => {
    const wrongPlayers: any[] = ['string', 10, true, [], {}];

    wrongPlayers.forEach((wrongPlayer) => {
      expect(() => getPlayerMoves(wrongPlayer, [])).toThrow(
        'player should be valid',
      );
    });
  });

  it('should throw an error if second arg is not a valid history', () => {
    const wrongHistories: any[] = [
      'string',
      10,
      true,
      {},
      [100],
      new Array(82).fill(0),
      new Array(1),
    ];

    wrongHistories.forEach((wrongHistory) => {
      expect(() => getPlayerMoves(TileState.Player1, wrongHistory)).toThrow(
        'history should be valid',
      );
    });
  });

  it('should return even number of the history if Player1 is passed to the arg', () => {
    const player1Moves = [
      {
        history: [],
        moves: [],
      },
      {
        history: [1],
        moves: [1],
      },
      {
        history: [1, 2],
        moves: [1],
      },
      {
        history: [1, 2, 3],
        moves: [1, 3],
      },
      {
        history: [1, 2, 3, 4],
        moves: [1, 3],
      },
      {
        history: [1, 2, 3, 4, 5],
        moves: [1, 3, 5],
      },
      {
        history: [1, 2, 3, 4, 5, 6],
        moves: [1, 3, 5],
      },
      {
        history: [1, 2, 3, 4, 5, 6, 7],
        moves: [1, 3, 5, 7],
      },
    ];

    player1Moves.forEach((player1Move) => {
      expect(getPlayerMoves(TileState.Player1, player1Move.history)).toEqual(
        player1Move.moves,
      );
    });
  });

  it('should return even number of the history if Player2 is passed to the arg', () => {
    const player2Moves = [
      {
        history: [],
        moves: [],
      },
      {
        history: [1],
        moves: [],
      },
      {
        history: [1, 2],
        moves: [2],
      },
      {
        history: [1, 2, 3],
        moves: [2],
      },
      {
        history: [1, 2, 3, 4],
        moves: [2, 4],
      },
      {
        history: [1, 2, 3, 4, 5],
        moves: [2, 4],
      },
      {
        history: [1, 2, 3, 4, 5, 6],
        moves: [2, 4, 6],
      },
    ];

    player2Moves.forEach((player2Move) => {
      expect(getPlayerMoves(TileState.Player2, player2Move.history)).toEqual(
        player2Move.moves,
      );
    });
  });
});
