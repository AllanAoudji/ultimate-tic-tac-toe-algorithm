export {};

declare global {
  const enum BoardState {
    Empty = 'EMPTY',
    Player1 = 'X',
    Player2 = 'Y',
  }

  const enum Mode {
    Continue,
    Normal,
  }

  const enum Position {
    TopRight,
    TopMiddle,
    TopLeft,
    MiddleRight,
    MiddleMiddle,
    MiddleLeft,
    BottomRight,
    BottomMiddle,
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

  interface Assets {
    activePlayer: BoardState.Player1 | BoardState.Player2;
    activeSection: number;
    board: BoardState[];
    history: number[];
    players: [BoardState.Player1, BoardState.Player2];
    sectionsState: [BoardState, WiningLine | null][];
    winner: BoardState;
  }

  interface Position2D {
    x: number;
    y: number;
  }

  interface Section {
    position: Position;
    tiles: Tile[][];
  }

  interface Tile {
    state: BoardState;
    position1D: number;
  }
}
