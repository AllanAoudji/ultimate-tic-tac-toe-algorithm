import convertTo1DArray from './convertTo1DArray';

const checkIfSectionIsFull: (section: BoardState[] | Tile[][]) => boolean = (
  section,
) => {
  let array1D: BoardState[];

  if (Object.keys(section).length === 0) {
    throw new Error('arg should be a 9 length array or a 3x3 matrix');
  }
  if (section.length !== 9 && section.length !== 3) {
    throw new Error('arg should be a 9 length array or a 3x3 matrix');
  }
  if (section.length === 3) {
    section.forEach((row) => {
      if (!Array.isArray(row) || row.length !== section.length) {
        throw new Error('arg should be a 9 length array or a 3x3 matrix');
      }
    });
    const matrixOfState = (section as Tile[][]).map((row) =>
      row.map((tile) => tile.state),
    );
    array1D = convertTo1DArray(matrixOfState);
  } else {
    array1D = [...(section as BoardState[])];
  }

  const isNotFull = array1D.some((tile) => tile === BoardState.Empty);

  return !isNotFull;
};

export default checkIfSectionIsFull;
