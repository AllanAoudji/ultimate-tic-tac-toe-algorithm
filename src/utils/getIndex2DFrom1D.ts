import {Index2D} from '@src/types';

const getIndex2DFrom1D: (position: number, squareSize?: number) => Index2D = (
  position,
  squareSize = 9,
) => {
  if (position >= squareSize * squareSize) {
    throw new Error('position out of bound');
  }

  const x = position % squareSize;
  const y = Math.floor(position / squareSize);

  return {x, y};
};

export default getIndex2DFrom1D;
