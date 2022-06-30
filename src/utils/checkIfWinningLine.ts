import {WinningLine} from '@src/types';

const checkIfWinningLine: (arg: any) => boolean = (arg) => {
  const validState = [
    WinningLine.BottomRow,
    WinningLine.LeftColumn,
    WinningLine.MiddleColumn,
    WinningLine.MiddleRow,
    WinningLine.RightColumn,
    WinningLine.Surrender,
    WinningLine.TopLeftBottomRightDiagonal,
    WinningLine.TopRightBottomLeftDiagonal,
    WinningLine.TopRow,
  ];

  return validState.includes(arg);
};

export default checkIfWinningLine;
