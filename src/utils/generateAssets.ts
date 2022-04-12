const generateAssets: () => Assets = () => ({
  activePlayer: BoardState.Player1,
  activeSection: 0,
  board: new Array(81).fill(BoardState.Empty),
  history: [],
  players: [BoardState.Player1, BoardState.Player2],
  sectionsState: new Array(9).fill([BoardState.Empty, null]),
  winner: BoardState.Empty,
});

export default generateAssets;
