import {Position, TileState} from '@src/types';
import convertTo2DArray from '@src/utils/convertTo2DArray';
import generateAssets from '@src/utils/generateAssets';
import getSections from '@src/utils/getSections';

describe('getSections', () => {
  it('should throw an error if property is not a valid board', () => {
    const wrongBoards: any[] = [
      new Array(9),
      new Array(8).fill(new Array(9).fill(TileState.Empty)),
      new Array(9).fill(new Array(8).fill(TileState.Empty)),
    ];

    wrongBoards.forEach((wrongBoard) => {
      expect(() => getSections(wrongBoard)).toThrow('board should be valid.');
    });
  });

  it('should work with an 1D array of length 81', () => {
    const array1D81 = new Array(81).fill(TileState.Empty);
    const sections = getSections(array1D81);

    expect(sections.length).toBe(9);
    sections.forEach((subSection) => {
      expect(subSection.tiles.length).toBe(3);
      subSection.tiles.forEach((rows) => {
        expect(rows.length).toBe(3);
      });
    });
  });

  it('should return an 9x3x3 matrix', () => {
    const board: TileState[] = new Array(81).fill(TileState.Empty);
    const sections = getSections(convertTo2DArray(board));

    expect(sections.length).toBe(9);
    sections.forEach((subSection) => {
      expect(subSection.tiles.length).toBe(3);
      subSection.tiles.forEach((rows) => {
        expect(rows.length).toBe(3);
      });
    });
  });

  it('should keep the order', () => {
    const board1D: TileState[] = new Array(81).fill(TileState.Empty);
    const board2D = convertTo2DArray(board1D);
    const sections = getSections(board2D);

    expect(sections[0].tiles[0][0].state).toBe(board2D[0][0].state);
    expect(sections[0].tiles[2][2].state).toBe(board2D[1][2].state);
    expect(sections[1].tiles[0][0].state).toBe(board2D[0][3].state);
    expect(sections[1].tiles[2][2].state).toBe(board2D[2][5].state);
    expect(sections[2].tiles[0][0].state).toBe(board2D[0][6].state);
    expect(sections[2].tiles[2][2].state).toBe(board2D[2][8].state);
    expect(sections[3].tiles[0][0].state).toBe(board2D[4][0].state);
    expect(sections[3].tiles[2][2].state).toBe(board2D[6][2].state);
    expect(sections[4].tiles[0][0].state).toBe(board2D[3][3].state);
    expect(sections[4].tiles[2][2].state).toBe(board2D[5][5].state);
    expect(sections[5].tiles[0][0].state).toBe(board2D[3][6].state);
    expect(sections[5].tiles[2][2].state).toBe(board2D[5][8].state);
    expect(sections[6].tiles[0][0].state).toBe(board2D[6][0].state);
    expect(sections[6].tiles[2][2].state).toBe(board2D[8][2].state);
    expect(sections[7].tiles[0][0].state).toBe(board2D[6][3].state);
    expect(sections[7].tiles[2][2].state).toBe(board2D[8][5].state);
    expect(sections[8].tiles[0][0].state).toBe(board2D[6][6].state);
    expect(sections[8].tiles[2][2].state).toBe(board2D[8][8].state);
  });

  it('should return proper position', () => {
    const {board} = generateAssets();
    const sections = getSections(board);

    expect(sections[0].position).toBe(Position.TopLeft);
    expect(sections[1].position).toBe(Position.TopMiddle);
    expect(sections[2].position).toBe(Position.TopRight);

    expect(sections[3].position).toBe(Position.MiddleLeft);
    expect(sections[4].position).toBe(Position.MiddleMiddle);
    expect(sections[5].position).toBe(Position.MiddleRight);

    expect(sections[6].position).toBe(Position.BottomLeft);
    expect(sections[7].position).toBe(Position.BottomMiddle);
    expect(sections[8].position).toBe(Position.BottomRight);
  });
});
