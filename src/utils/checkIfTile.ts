import checkIfTileState from './checkIfTileState';

const checkIfTile: (item: any) => boolean = (item) => {
  if (typeof item !== 'object') {
    return false;
  }

  const keys = Object.keys(item);
  if (
    keys.length !== 2 ||
    !keys.includes('index1D') ||
    typeof item.index1D !== 'number' ||
    !keys.includes('state') ||
    !checkIfTileState(item.state)
  ) {
    return false;
  }

  return true;
};

export default checkIfTile;
