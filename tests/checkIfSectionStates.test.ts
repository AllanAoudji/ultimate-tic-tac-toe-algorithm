import {TileState, WinningLine} from '@src/types';
import checkIfSectionStates from '@src/utils/checkIfSectionStates';

describe('checkIfSectionStates', () => {
  it('should return false if arg is not an array', () => {
    const wrongSectionStatesArray = ['string', 0, true, {}];

    wrongSectionStatesArray.forEach((wrongSectionStates) => {
      expect(checkIfSectionStates(wrongSectionStates)).toBe(false);
    });
  });

  it('should return false if arg is an empty instance of an array', () => {
    const wrongSectionStates = new Array(9);

    expect(checkIfSectionStates(wrongSectionStates)).toBe(false);
  });

  it('should return false if arg.length is not equal to 9', () => {
    const wrongSectionStates = new Array(8).fill([TileState.Empty, null]);

    expect(checkIfSectionStates(wrongSectionStates)).toBe(false);
  });

  it('should return false if at least one item of arg is not a section state', () => {
    const wrongSectionStates = new Array(9).fill([TileState.Empty, null]);
    wrongSectionStates[0] = [TileState.Player1, null];

    expect(checkIfSectionStates(wrongSectionStates)).toBe(false);
  });

  it('should return true if arg is a valid sectionStates', () => {
    const sectionStates1 = new Array(9).fill([TileState.Empty, null]);
    const sectionStates2 = new Array(9).fill([
      TileState.Player1,
      WinningLine.BottomRow,
    ]);
    const sectionState3 = new Array(9).fill([
      TileState.Player2,
      WinningLine.BottomRow,
    ]);
    const sectionState4 = new Array(9).fill([
      TileState.Player2,
      WinningLine.TopRow,
    ]);
    const sectionState5 = new Array(9).fill([TileState.Empty, null]);

    expect(checkIfSectionStates(sectionStates1)).toBe(true);
    expect(checkIfSectionStates(sectionStates2)).toBe(true);
    expect(checkIfSectionStates(sectionState3)).toBe(true);
    expect(checkIfSectionStates(sectionState4)).toBe(true);
    expect(checkIfSectionStates(sectionState5)).toBe(true);
  });
});
