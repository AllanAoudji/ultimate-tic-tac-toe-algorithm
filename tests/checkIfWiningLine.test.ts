import {WiningLine} from '@src/types';
import checkIfWiningLine from '@src/utils/checkIfWiningLine';

describe('checkIfWiningLine', () => {
  it('should return false if arg is not a WiningLine', () => {
    const notWiningLines = [
      'string',
      false,
      [WiningLine.BottomRow],
      {
        winingLine: WiningLine.BottomRow,
      },
    ];

    notWiningLines.forEach((notWiningLine) => {
      expect(checkIfWiningLine(notWiningLine)).toBe(false);
    });
  });

  it('should return true if arg is a WiningLine', () => {
    const winingLines = [
      WiningLine.TopRow,
      WiningLine.MiddleRow,
      WiningLine.BottomRow,
      WiningLine.LeftColumn,
      WiningLine.MiddleColumn,
      WiningLine.RightColumn,
      WiningLine.TopLeftBottomRightDiagonal,
      WiningLine.TopRightBottomLeftDiagonal,
    ];

    winingLines.forEach((winingLine) => {
      expect(checkIfWiningLine(winingLine)).toBe(true);
    });
  });
});
