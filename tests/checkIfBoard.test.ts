import {TileState} from '@src/types';
import checkIfBoard from '@src/utils/checkIfBoard';
import convertTo2DArray from '@src/utils/convertTo2DArray';
import generateAssets from '@src/utils/generateAssets';
import generateBoardFromHistory from '@src/utils/generateBoardFromHistory';

describe('checkIfBoard', () => {
  const board = new Array(81).fill(TileState.Empty);

  it('should return false if arg is not an array', () => {
    const notAnArrays = ['string', 0, true, {}];

    notAnArrays.forEach((notAnArray) => {
      expect(checkIfBoard(notAnArray)).toBe(false);
    });
  });

  it('should return false if arg is an empty instance of an array', () => {
    const wrongArrays = [new Array(9), new Array(81)];

    wrongArrays.forEach((wrongArray) => {
      expect(checkIfBoard(wrongArray)).toBe(false);
    });
  });

  it('should return false if arg is not a 81 or a 9 length array', () => {
    const wrongArray = new Array(10).fill(TileState.Empty);

    expect(checkIfBoard(wrongArray)).toBe(false);
  });

  it('should return false if at least one of the item of the 9 length array is not a TileState', () => {
    const wrongArray = new Array(81).fill(TileState.Empty);
    wrongArray[0] = 'not a TileState';

    expect(checkIfBoard(wrongArray)).toBe(false);
  });

  it('should return false is the 9 length array is not a square matrix', () => {
    const wrongMatrixes = [
      new Array(9).fill({
        state: TileState.Empty,
        index1D: 0,
      }),
      new Array(9).fill(new Array(9)),
      new Array(9).fill(
        new Array(8).fill({
          state: TileState.Empty,
          index1D: 0,
        }),
      ),
    ];

    wrongMatrixes.forEach((wrongMatrix) => {
      expect(checkIfBoard(wrongMatrix)).toBe(false);
    });
  });

  it('should return false if at least one item of the square matrix is not a valid tile', () => {
    const {history} = generateAssets();
    const wrongMatrix1 = convertTo2DArray(board);
    wrongMatrix1[0][0] = {
      index1D: 10,
      state: TileState.Empty,
    };
    const wrongMatrix2: any[][] = convertTo2DArray(
      generateBoardFromHistory(history),
    );
    wrongMatrix2[0][0] = {
      index1D: 0,
      state: 'not a state',
    };

    expect(checkIfBoard(wrongMatrix1)).toBe(false);
    expect(checkIfBoard(wrongMatrix2)).toBe(false);
  });

  it('should return true if arg is a valid 1D board', () => {
    const {history} = generateAssets();

    expect(checkIfBoard(board)).toBe(true);
  });

  it('should return true if arg is a valid 2D board', () => {
    expect(checkIfBoard(convertTo2DArray(board))).toBe(true);
  });
});
