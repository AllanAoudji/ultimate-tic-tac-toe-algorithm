import {Position, Section} from '@src/types';

import convertTo2DArray from './convertTo2DArray';
import checkIfHistory from './checkIfHistory';
import generateBoardFromHistory from './generateBoardFromHistory';

const getSections: (history: number[]) => Section[] = (history) => {
  if (!checkIfHistory(history)) {
    throw new Error('board should be valid.');
  }

  const board = generateBoardFromHistory(history);
  const array2D = convertTo2DArray(board);

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
