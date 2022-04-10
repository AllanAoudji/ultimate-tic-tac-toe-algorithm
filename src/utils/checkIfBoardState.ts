const checkIfBoardState: (item: any) => boolean = (item) => {
  const validState = [BoardState.Empty, BoardState.Player1, BoardState.Player2];

  return validState.includes(item);
};

export default checkIfBoardState;
