import {Tile, TileState} from '@src/types';
import checkIfDraw from '@src/utils/checkIfDraw';
import generateAssets from '@src/utils/generateAssets';
import getSections from '@src/utils/getSections';

describe('checkIfDraw', () => {
  let section: Tile[][];

  beforeEach(() => {
    const {history} = generateAssets();
    section = getSections(history)[0].tiles;
  });

  it('return false if there is less than 6 moves in the section', () => {
    section[0][0].state = TileState.Player1;
    expect(checkIfDraw(section)).toBe(false);
    section[0][1].state = TileState.Player1;
    expect(checkIfDraw(section)).toBe(false);
    section[0][2].state = TileState.Player2;
    expect(checkIfDraw(section)).toBe(false);
    section[1][0].state = TileState.Player1;
    expect(checkIfDraw(section)).toBe(false);
    section[1][1].state = TileState.Player2;
    expect(checkIfDraw(section)).toBe(false);
  });

  it('return false if at least one column/rows have only one move', () => {
    section[0][0].state = TileState.Player1;
    section[0][1].state = TileState.Player2;
    section[0][2].state = TileState.Player1;
    section[1][1].state = TileState.Player2;
    section[2][2].state = TileState.Player1;
    expect(checkIfDraw(section)).toBe(false);
  });

  it('return true if each columns/rows/diagonals have a TileState.Draw tile', () => {
    section[0][0].state = TileState.Draw;
    section[1][1].state = TileState.Draw;
    section[2][2].state = TileState.Draw;
    expect(checkIfDraw(section)).toBe(true);
  });

  it('throw an error if arg is not a valid section', () => {
    const notASection: any = 'not a section';
    expect(() => checkIfDraw(notASection)).toThrow('section should be valid');
  });

  it('return true if the section is draw', () => {
    section[0][1].state = TileState.Player1;
    section[0][2].state = TileState.Player2;

    section[1][0].state = TileState.Player2;
    section[1][1].state = TileState.Player2;
    section[1][2].state = TileState.Player1;

    section[2][0].state = TileState.Player1;
    section[2][1].state = TileState.Player2;
    section[2][2].state = TileState.Player1;
    expect(checkIfDraw(section)).toBe(true);
  });
});
