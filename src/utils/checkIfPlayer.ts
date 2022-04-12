const checkIfPlayer: (item: any) => boolean = (item) => {
  const validPlayer = [TileState.Player1, TileState.Player2];

  return validPlayer.includes(item);
};

export default checkIfPlayer;
