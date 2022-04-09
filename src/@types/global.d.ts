export {};

declare global {
  const enum BoardState {
    Empty = 'EMPTY',
    Player1 = 'X',
    Player2 = 'Y',
  }

  const enum Position {
    TopRight,
    TopMiddle,
    TopLeft,
    MiddleRight,
    MiddleMiddle,
    MiddleLeft,
    BottomRight,
    BottomLeft,
  }

  const enum WiningLine {
    TopRow,
    MiddleRow,
    BottomRow,
    LeftColumn,
    MiddleColumn,
    RightColumn,
    TopLeftBottomRightDiagonal,
    TopRightBottomLeftDiagonal,
  }

  interface Position2D {
    x: number;
    y: number;
  }
}
