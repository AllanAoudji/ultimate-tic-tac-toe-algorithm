interface Option {
  mode?: Mode;
}

const generateAssets: (options?: Option) => Assets = (option = {}) => ({
  activePlayer: TileState.Player1,
  activeSection: null,
  board: new Array(81).fill(TileState.Empty),
  history: [],
  mode: option.mode === undefined ? Mode.Normal : option.mode,
  sectionStates: new Array(9).fill([TileState.Empty, null]),
  winner: TileState.Empty,
});

export default generateAssets;
