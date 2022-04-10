const getPosition2DFrom1D: (
  position: number,
  squareSize?: number,
) => Position2D = (position, squareSize = 9) => {
  if (position >= squareSize * squareSize) {
    throw new Error('position out of bound');
  }

  const x = position % squareSize;
  const y = Math.floor(position / squareSize);

  return {x, y};
};

export default getPosition2DFrom1D;
