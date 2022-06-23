export enum Mode {
  Continue,
  Normal,
}

export enum Position {
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

export enum TileState {
  Empty = 'EMPTY',
  Player1 = 'X',
  Player2 = 'Y',
}

export enum WinningLine {
  TopRow,
  MiddleRow,
  BottomRow,
  LeftColumn,
  MiddleColumn,
  RightColumn,
  TopLeftBottomRightDiagonal,
  TopRightBottomLeftDiagonal,
  Draw,
  Surrender,
}

export interface Assets {
  history: number[];
  mode: Mode;
  sectionStates: SectionState[];
  winner: SectionState;
}

export interface Index2D {
  x: number;
  y: number;
}

export interface Section {
  position: Position;
  tiles: Tile[][];
}

export interface Tile {
  state: TileState;
  index1D: number;
}

export type SectionState =
  | [TileState.Player1 | TileState.Player2, WinningLine]
  | [TileState.Empty, null]
  | [TileState.Empty, WinningLine.Draw];
