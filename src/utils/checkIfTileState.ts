import {TileState} from '@src/types';

const checkIfTileState: (item: any) => boolean = (item) => {
  const validState = [
    TileState.Draw,
    TileState.Empty,
    TileState.Player1,
    TileState.Player2,
  ];

  return validState.includes(item);
};

export default checkIfTileState;
