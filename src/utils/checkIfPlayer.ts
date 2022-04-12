const checkIfPlayer: (item: any) => boolean = (item) => {
  const validPlayer = [BoardState.Player1, BoardState.Player2];

  return validPlayer.includes(item);
};

export default checkIfPlayer;
