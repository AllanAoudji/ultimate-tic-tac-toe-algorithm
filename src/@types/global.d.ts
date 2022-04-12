export {};

declare global {
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

  const enum TileState {
    Empty = 'EMPTY',
    Player1 = 'X',
    Player2 = 'Y',
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
    activePlayer: TileState.Player1 | TileState.Player2;
    activeSection: number;
    board: TileState[];
    history: number[];
    players: [TileState.Player1, TileState.Player2];
    sectionsState: [TileState, WiningLine | null][];
    winner: TileState;
  }

  interface Index2D {
    x: number;
    y: number;
  }

  interface Section {
    position: Position;
    tiles: Tile[][];
  }

  interface Tile {
    state: TileState;
    index1D: number;
  }
}
