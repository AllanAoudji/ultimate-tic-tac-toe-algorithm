import checkIfTile from './checkIfTile';
import checkIfTileState from './checkIfTileState';

const checkIfSection: (section: any) => boolean = (section) => {
  if (!Array.isArray(section) || Object.keys(section).length === 0) {
    return false;
  }

  if (section.length !== 9 && section.length !== 3) {
    return false;
  }

  if (
    section.length === 9 &&
    section.some((tileState) => !checkIfTileState(tileState))
  ) {
    return false;
  }

  if (
    section.length === 3 &&
    section.some(
      (tiles) =>
        !Array.isArray(tiles) ||
        Object.keys(tiles).length !== 3 ||
        tiles.some((tile) => !checkIfTile(tile)),
    )
  ) {
    return false;
  }

  return true;
};

export default checkIfSection;
