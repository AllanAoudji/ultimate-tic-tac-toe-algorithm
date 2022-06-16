import {WiningLine} from '@src/types';

const checkIfWiningLine: (arg: any) => boolean = (arg) => {
  const validState = [
    WiningLine.TopRow,
    WiningLine.MiddleRow,
    WiningLine.BottomRow,
    WiningLine.LeftColumn,
    WiningLine.MiddleColumn,
    WiningLine.RightColumn,
    WiningLine.TopLeftBottomRightDiagonal,
    WiningLine.TopRightBottomLeftDiagonal,
    WiningLine.Draw,
    WiningLine.Surrender,
  ];

  return validState.includes(arg);
};

export default checkIfWiningLine;
