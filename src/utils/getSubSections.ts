import checkIfBoardState from './checkIfBoardState';
import checkIfTile from './checkIfTile';
import convertTo2DArray from './convertTo2DArray';

const getSubSections: (board: Tile[][] | BoardState[]) => Section[] = (
  board,
) => {
  let array2D: Tile[][];

  if (!Array.isArray(board) || Object.keys(board).length === 0) {
    throw new Error('arg should be a 81 length array or a 9x9 matrix');
  }
  // Check if outer shape might match
  if (board.length !== 9 && board.length !== 81) {
    throw new Error('arg should be a 81 length array or a 9x9 matrix');
  }

  // Check if whole shape might match
  // and assign the 2D representation of the board
  // to array2D
  if (board.length === 9) {
    board.forEach((row) => {
      if (
        !Array.isArray(row) ||
        Object.keys(board).length === 0 ||
        row.length !== 9
      ) {
        throw new Error('arg should be a 81 length array or a 9x9 matrix');
      }
      (row as Tile[]).forEach((tile) => {
        if (!checkIfTile(tile)) {
          throw new Error('matrix board should be a matrix of tile');
        }
      });
    });
    array2D = [...(board as Tile[][])];
  } else {
    board.forEach((boardState) => {
      if (!checkIfBoardState(boardState)) {
        throw new Error('array board should be an array of boardState');
      }
    });
    array2D = convertTo2DArray(board as BoardState[]);
  }

  // Representation of a scan
  // of each sub board that might be splitted
  const slices = [
    [0, 2, 0, 2, Position.TopLeft],
    [3, 5, 0, 2, Position.TopMiddle],
    [6, 9, 0, 2, Position.TopRight],
    [0, 2, 3, 5, Position.MiddleLeft],
    [3, 5, 3, 5, Position.MiddleMiddle],
    [6, 9, 3, 5, Position.MiddleRight],
    [0, 2, 6, 9, Position.BottomLeft],
    [3, 5, 6, 9, Position.BottomMiddle],
    [6, 9, 6, 9, Position.BottomRight],
  ];

  // Split 9x9 board to 9 different slices
  const subSections = slices.reduce<Section[]>((rows, key) => {
    const section = array2D
      .slice(key[2], key[3] + 1)
      .map((boardIndex) => boardIndex.slice(key[0], key[1] + 1));
    rows.push({
      tiles: section,
      position: key[4],
    });
    return rows;
  }, []);

  return subSections;
};

export default getSubSections;
