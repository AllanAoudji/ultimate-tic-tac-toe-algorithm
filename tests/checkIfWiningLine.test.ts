import {WinningLine} from '@src/types';
import checkIfWinningLine from '@src/utils/checkIfWinningLine';

describe('checkIfWinningLine', () => {
  it('should return false if arg is not a WinningLine', () => {
    const notWinningLines = [
      'string',
      false,
      [WinningLine.BottomRow],
      {
        WinningLine: WinningLine.BottomRow,
      },
    ];

    notWinningLines.forEach((notWinningLine) => {
      expect(checkIfWinningLine(notWinningLine)).toBe(false);
    });
  });

  it('should return true if arg is a WinningLine', () => {
    const winningLines = [
      WinningLine.TopRow,
      WinningLine.MiddleRow,
      WinningLine.BottomRow,
      WinningLine.LeftColumn,
      WinningLine.MiddleColumn,
      WinningLine.RightColumn,
      WinningLine.TopLeftBottomRightDiagonal,
      WinningLine.TopRightBottomLeftDiagonal,
      WinningLine.Draw,
      WinningLine.Surrender,
    ];

    winningLines.forEach((winningLine) => {
      expect(checkIfWinningLine(winningLine)).toBe(true);
    });
  });
});
