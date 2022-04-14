import {Index2D} from '@src/types';

const getIndex1DFrom2D: (position: Index2D, squareSize?: number) => number = (
  {x, y},
  squareSize = 9,
) => {
  if (x >= squareSize || y >= squareSize) {
    throw new Error('position out of bound');
  }

  return x + y * squareSize;
};

export default getIndex1DFrom2D;
