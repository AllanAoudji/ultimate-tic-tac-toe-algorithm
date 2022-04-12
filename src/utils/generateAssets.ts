const generateAssets: () => Assets = () => ({
  activePlayer: TileState.Player1,
  activeSection: 0,
  board: new Array(81).fill(TileState.Empty),
  history: [],
  players: [TileState.Player1, TileState.Player2],
  sectionsState: new Array(9).fill([TileState.Empty, null]),
  winner: TileState.Empty,
});

export default generateAssets;
