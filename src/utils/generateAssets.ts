interface Option {
  mode?: Mode;
}

const generateAssets: (options?: Option) => Assets = (option = {}) => ({
  activeSection: null,
  board: new Array(81).fill(TileState.Empty),
  history: [],
  mode: option.mode === undefined ? Mode.Normal : option.mode,
  sectionStates: new Array(9).fill([TileState.Empty, null]),
  winner: [TileState.Empty, null],
});

export default generateAssets;
