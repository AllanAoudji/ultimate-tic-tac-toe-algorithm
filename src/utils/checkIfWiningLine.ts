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
  ];

  return validState.includes(arg);
};

export default checkIfWiningLine;
