import checkIfBoardState from './checkIfBoardState';

const checkIfTile: (item: any) => boolean = (item) => {
  if (typeof item !== 'object') {
    return false;
  }

  const keys = Object.keys(item);
  if (
    keys.length !== 2 ||
    !keys.includes('position1D') ||
    typeof item.position1D !== 'number' ||
    !keys.includes('state') ||
    !checkIfBoardState(item.state)
  ) {
    return false;
  }

  return true;
};

export default checkIfTile;
