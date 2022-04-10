import checkIfBoardState from '@src/utils/checkIfBoardState';

describe('checkIfBoardState', () => {
  it('should return true if arg is a boardState', () => {
    const boardStates = [
      BoardState.Empty,
      BoardState.Player1,
      BoardState.Player2,
    ];

    boardStates.forEach((boardState) => {
      expect(checkIfBoardState(boardState)).toBe(true);
    });
  });

  it('should return false if arg is not a boardState', () => {
    const notBoardStates = [
      'not a board state',
      false,
      [BoardState.Empty],
      {
        state: BoardState.Empty,
        position1D: 1,
      },
    ];

    notBoardStates.forEach((notBoardState) => {
      expect(checkIfBoardState(notBoardState)).toBe(false);
    });
  });
});
