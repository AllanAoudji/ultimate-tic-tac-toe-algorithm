import {Mode, TileState} from '@src/types';
import convertTo2DArray from '@src/utils/convertTo2DArray';
import generateAssets from '@src/utils/generateAssets';
import getActiveSection from '@src/utils/getActiveSection';
import * as getSections from '@src/utils/getSections';

const {board} = generateAssets();

describe('getActiveSection', () => {
  it('should throw an error if first arg is not a valid history', () => {
    const wrongHistories: any[] = [0, 'string', true, {}, [100], new Array(9)];

    wrongHistories.forEach((wrongHistory) => {
      expect(() => getActiveSection(wrongHistory, board)).toThrow(
        'history should be valid',
      );
    });
  });

  it('should throw an error if second arg is not a valid board', () => {
    const wrongBoard: any[] = [];

    expect(() => getActiveSection([], wrongBoard)).toThrow(
      'board should be valid',
    );
  });

  it('should throw an error if third arg is not a vlide mode', () => {
    const wrongModes: any[] = [10, 'string', true, {}, []];

    wrongModes.forEach((wrongMode) => {
      expect(() => getActiveSection([], board, wrongMode)).toThrow(
        'mode should be valid',
      );
    });
  });

  it('should return null if history.length === 0', () => {
    const emptyHistory: number[] = [];

    expect(getActiveSection(emptyHistory, board)).toBeNull();
  });

  it('should return 0 if last item of history === 0/3/6/27/30/33/54/57/60', () => {
    const topLeftTiles = [
      [1, 0],
      [50, 18, 3],
      [6],
      [10, 11, 12, 13, 27],
      [30],
      [33],
      [10, 11, 54],
      [57],
      [60],
    ];

    topLeftTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(0);
    });
  });

  it('should return 1 if last item of history === 1/4/7/28/31/34/55/58/61', () => {
    const topMiddleTiles = [
      [0, 1],
      [0, 1, 4],
      [80, 70, 6, 7],
      [28],
      [3, 67, 31],
      [34],
      [55],
      [0, 58],
      [61],
    ];

    topMiddleTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(1);
    });
  });

  it('should return 2 if last item of history === 2/5/8/29/32/35/56/59/62', () => {
    const topRightTiles = [[2], [5], [8], [29], [32], [35], [56], [59], [62]];

    topRightTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(2);
    });
  });

  it('should return 3 if last item of history === 9/12/15/36/39/42/63/66/69', () => {
    const middleLeftTiles = [
      [9],
      [12],
      [15],
      [36],
      [39],
      [42],
      [63],
      [66],
      [69],
    ];

    middleLeftTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(3);
    });
  });

  it('should return 4 if last item of history === 10/13/16/37/40/43/64/67/70', () => {
    const middleMiddleTiles = [
      [10],
      [13],
      [16],
      [37],
      [40],
      [43],
      [64],
      [67],
      [70],
    ];

    middleMiddleTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(4);
    });
  });

  it('should return 5 if last item of history === 11/14/17/38/41/44/65/68/71', () => {
    const middleRightTiles = [
      [11],
      [14],
      [17],
      [38],
      [41],
      [44],
      [65],
      [68],
      [71],
    ];

    middleRightTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(5);
    });
  });

  it('should return 6 if last item of history === 18/21/24/45/48/51/72/75/78', () => {
    const BottomLeftTiles = [
      [18],
      [21],
      [24],
      [45],
      [48],
      [51],
      [72],
      [75],
      [78],
    ];

    BottomLeftTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(6);
    });
  });

  it('should return 7 if last item of history === 19/22/25/46/49/52/73/76/79', () => {
    const BottomMiddleTiles = [
      [19],
      [22],
      [25],
      [46],
      [49],
      [52],
      [73],
      [76],
      [79],
    ];

    BottomMiddleTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(7);
    });
  });

  it('should return 8 if last item of history === 20/23/26/47/50/53/74/77/80', () => {
    const BottomRightTiles = [
      [20],
      [23],
      [26],
      [47],
      [50],
      [53],
      [74],
      [77],
      [80],
    ];

    BottomRightTiles.forEach((tile) => {
      expect(getActiveSection(tile, board)).toBe(8);
    });
  });

  it('should return null if mode === Normal and the next section is already won', () => {
    const {board: winBoard1} = generateAssets();
    winBoard1[0] = TileState.Player1;
    winBoard1[1] = TileState.Player1;
    winBoard1[2] = TileState.Player1;

    const {board: winBoard2} = generateAssets();
    winBoard2[0] = TileState.Player2;
    winBoard2[10] = TileState.Player2;
    winBoard2[20] = TileState.Player2;

    const {board: winBoard3} = generateAssets();
    winBoard3[51] = TileState.Player1;
    winBoard3[52] = TileState.Player1;
    winBoard3[53] = TileState.Player1;

    expect(getActiveSection([0], winBoard1)).toBeNull();
    expect(getActiveSection([0], winBoard2)).toBeNull();
    expect(getActiveSection([17], winBoard3)).toBeNull();
  });

  it('should return null if mode === CONTINUE and the next section is full', () => {
    const {board: winBoard1} = generateAssets();
    winBoard1[0] = TileState.Player1;
    winBoard1[1] = TileState.Player1;
    winBoard1[2] = TileState.Player2;
    winBoard1[9] = TileState.Player2;
    winBoard1[10] = TileState.Player1;
    winBoard1[11] = TileState.Player1;
    winBoard1[18] = TileState.Player2;
    winBoard1[19] = TileState.Player1;
    winBoard1[20] = TileState.Player1;

    const {board: winBoard2} = generateAssets();
    winBoard2[57] = TileState.Player1;
    winBoard2[58] = TileState.Player2;
    winBoard2[59] = TileState.Player1;
    winBoard2[66] = TileState.Player1;
    winBoard2[67] = TileState.Player1;
    winBoard2[68] = TileState.Player2;
    winBoard2[75] = TileState.Player1;
    winBoard2[76] = TileState.Player2;
    winBoard2[77] = TileState.Player2;

    expect(getActiveSection([6], winBoard1, Mode.Continue)).toBeNull();
    expect(getActiveSection([49], winBoard2, Mode.Continue)).toBeNull();
  });

  it('should work with a matrix board', () => {
    const {board} = generateAssets();
    const matrixBoard = convertTo2DArray(board);

    expect(getActiveSection([0], matrixBoard, Mode.Continue)).toBe(0);
  });

  it('should throw an error if no valid position was found', () => {
    jest.spyOn(getSections, 'default').mockReturnValue([]);
    expect(() => getActiveSection([1], board)).toThrow('position not found');
  });
});
