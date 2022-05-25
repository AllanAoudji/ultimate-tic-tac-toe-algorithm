import {Position, Section, Tile, TileState} from '@src/types';

import checkIfTileState from './checkIfTileState';
import checkIfTile from './checkIfTile';
import convertTo2DArray from './convertTo2DArray';
import checkIfBoard from './checkIfBoard';

const getSections: (board: Tile[][] | TileState[]) => Section[] = (board) => {
  let array2D: Tile[][];

  if (!checkIfBoard(board)) {
    throw new Error('board should be valid.');
  }

  if (board.length === 9) {
    array2D = [...(board as Tile[][])];
  } else {
    array2D = convertTo2DArray(board as TileState[]);
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
  const sections = slices.reduce<Section[]>((rows, key) => {
    const section = array2D
      .slice(key[2], key[3] + 1)
      .map((boardIndex) => boardIndex.slice(key[0], key[1] + 1));
    rows.push({
      tiles: section,
      position: key[4],
    });
    return rows;
  }, []);

  return sections;
};

export default getSections;
