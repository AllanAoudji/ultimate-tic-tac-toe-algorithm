import {WinningLine} from '@src/types';

const checkIfWinningLine: (arg: any) => boolean = (arg) => {
  const validState = [
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

  return validState.includes(arg);
};

export default checkIfWinningLine;
