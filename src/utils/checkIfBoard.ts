import checkIfBoardState from './checkIfBoardState';
import checkIfTile from './checkIfTile';

const checkIfBoard: (board: any) => boolean = (board) => {
  if (!Array.isArray(board) || Object.keys(board).length === 0) {
    return false;
  }

  if (board.length !== 9 && board.length !== 81) {
    return false;
  }

  if (board.length === 81) {
    return board.every((item) => checkIfBoardState(item));
  }

  if (board.length === 9) {
    return board.every(
      (row, indexRow) =>
        Array.isArray(row) &&
        Object.keys(row).length &&
        row.length === board.length &&
        row.every(
          (item, indexCol) =>
            checkIfTile(item) && indexCol + indexRow * 9 === item.position1D,
        ),
    );
  }

  return true;
};

export default checkIfBoard;
