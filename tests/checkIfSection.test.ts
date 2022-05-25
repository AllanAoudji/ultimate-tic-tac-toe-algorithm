import {TileState} from '@src/types';
import checkIfSection from '@src/utils/checkIfSection';

describe('checkIfSection', () => {
  it('should return false if property is not an array', () => {
    const notAnArrays: any[] = [1, '1', true, {foo: 'bar'}];
    notAnArrays.forEach((notAnArray) => {
      expect(checkIfSection(notAnArray)).toBe(false);
    });
  });

  it('should return false if property is an empty array', () => {
    const wrongSections: any[] = [new Array(9), new Array(3), []];
    wrongSections.forEach((wrongSection) => {
      expect(checkIfSection(wrongSection)).toBe(false);
    });
  });

  it('should return false if property is not a 9-length/3-length array', () => {
    const wrongSection = new Array(8).fill(0);
    expect(checkIfSection(wrongSection)).toBe(false);
  });

  it("should return false if property is a 9-length array but one of it's index is not a tileState", () => {
    const wrongSection = new Array(9).fill(TileState.Empty);
    wrongSection[0] = 'not a tile state';
    expect(checkIfSection(wrongSection)).toBe(false);
  });

  it("should return false if property is a 3-length array but one of it's index is not an array", () => {
    const wrongSection = new Array(3).fill([]);
    wrongSection[0] = TileState.Empty;
    expect(checkIfSection(wrongSection)).toBe(false);
  });

  it('should return false if property is a 3-length array but not a 3x3 matrix', () => {
    const wrongSection = new Array(3).fill([0, 0, 0]);
    wrongSection[0] = [0, 0];
    expect(checkIfSection(wrongSection)).toBe(false);
  });

  it('should return false if property is a 3x3 matrix but one of his index is not a Tile', () => {
    const wrongSection = new Array(3).fill(
      new Array(3).fill({state: TileState.Empty, index1D: 0}),
    );
    wrongSection[0][2] = 'not a tile';
    expect(checkIfSection(wrongSection)).toBe(false);
  });

  it('should return true if property is a valid section', () => {
    const validMatrixSetion = new Array(3).fill(
      new Array(3).fill({state: TileState.Empty, index1D: 0}),
    );
    const valid1DSection = new Array(9).fill(TileState.Empty);
    expect(checkIfSection(validMatrixSetion)).toBe(true);
    expect(checkIfSection(valid1DSection)).toBe(true);
  });
});
