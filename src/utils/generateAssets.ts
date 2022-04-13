const generateAssets: () => Assets = () => ({
  activePlayer: TileState.Player1,
  activeSection: null,
  board: new Array(81).fill(TileState.Empty),
  history: [],
  sectionStates: new Array(9).fill([TileState.Empty, null]),
  winner: TileState.Empty,
});

export default generateAssets;
