import {TileState} from '@src/types';
import checkIfSectionIsFull from '@src/utils/checkIfSectionIsFull';

describe('checkIfSectionIsFull', () => {
  it('should throw an error property is not a valid section', () => {
    const emptyArray = [
      new Array(9),
      new Array(8).fill(TileState.Empty),
      new Array(2).fill(new Array(3).fill(TileState.Empty)),
      new Array(3).fill(new Array(2).fill(TileState.Empty)),
      new Array(3).fill(new Array(3).fill(0)),
      new Array(3).fill(new Array(3).fill({})),
      new Array(9).fill(true),
    ];

    expect(() => checkIfSectionIsFull(emptyArray)).toThrow(
      'section should be valid.',
    );
  });

  it('should return true if each tile === Player_1 or Player_2', () => {
    const matrixOfTileState = [
      [TileState.Player1, TileState.Player2, TileState.Player1],
      [TileState.Player2, TileState.Player1, TileState.Player2],
      [TileState.Player1, TileState.Player2, TileState.Player1],
    ];
    const matrixOfTile = matrixOfTileState.map((row) =>
      row.map((tile) => ({state: tile, index1D: 0})),
    );

    expect(checkIfSectionIsFull(matrixOfTile)).toBe(true);
  });

  it('should work with a 1D array', () => {
    const array1D = [
      TileState.Player1,
      TileState.Player2,
      TileState.Player1,
      TileState.Player2,
      TileState.Player1,
      TileState.Player2,
      TileState.Player1,
      TileState.Player2,
      TileState.Player1,
    ];

    expect(checkIfSectionIsFull(array1D)).toBe(true);
  });

  it('should return false if at least 1 tile === Empty', () => {
    const tests = [
      [
        TileState.Empty,
        TileState.Player2,
        TileState.Empty,
        TileState.Player2,
        TileState.Empty,
        TileState.Empty,
        TileState.Player1,
        TileState.Empty,
        TileState.Player1,
      ],
      [
        TileState.Empty,
        TileState.Player2,
        TileState.Empty,
        TileState.Player2,
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Empty,
        TileState.Player1,
      ],
      [
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Empty,
        TileState.Player1,
      ],
      [
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Player1,
      ],
      [
        TileState.Empty,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Player1,
        TileState.Player2,
        TileState.Player1,
      ],
    ];

    tests.forEach((test) => {
      expect(checkIfSectionIsFull(test)).toBe(false);
    });
  });
});
