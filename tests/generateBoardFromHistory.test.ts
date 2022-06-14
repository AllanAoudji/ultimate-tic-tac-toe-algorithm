import {TileState} from '@src/types';
import generateBoardFromHistory from '@src/utils/generateBoardFromHistory';

describe('generateBoardFromHistory', () => {
  it('returns an empty board if history is an empty array', () => {
    expect(generateBoardFromHistory([])).toEqual(
      new Array(81).fill(TileState.Empty),
    );
  });

  it('throws an error if board is invalid', () => {
    expect(() => generateBoardFromHistory([100])).toThrow('history is invalid');
    expect(() => generateBoardFromHistory(new Array(90).fill(0))).toThrow(
      'history is invalid',
    );
  });

  it('even move should be first player', () => {
    expect(generateBoardFromHistory([10])[10]).toBe(TileState.Player1);
    expect(generateBoardFromHistory([10, 40, 11])[11]).toBe(TileState.Player1);
  });

  it('odd move should be second player', () => {
    expect(generateBoardFromHistory([10, 30])[30]).toBe(TileState.Player2);
    expect(generateBoardFromHistory([10, 30, 32, 41])[41]).toBe(
      TileState.Player2,
    );
  });
});
