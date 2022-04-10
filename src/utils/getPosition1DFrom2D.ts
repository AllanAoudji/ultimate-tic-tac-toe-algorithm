const getPosition1DFrom2D: (
  position: Position2D,
  squareSize?: number,
) => number = ({x, y}, squareSize = 9) => {
  if (x >= squareSize || y >= squareSize) {
    throw new Error('position out of bound');
  }

  return x + y * squareSize;
};

export default getPosition1DFrom2D;
