const generateAssets: () => Assets = () => ({
  activePlayer: TileState.Player1,
  activeSection: 0,
  board: new Array(81).fill(TileState.Empty),
  history: [],
  sectionsState: new Array(9).fill([TileState.Empty, null]),
  winner: TileState.Empty,
});

export default generateAssets;
