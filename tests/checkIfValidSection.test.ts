import checkIfValidSection from '@src/utils/checkIfValidSection';
import {Mode} from '@src/types';

describe('checkIfValidSection', () => {
  it('should throw an error if first parameter is not a valid board', () => {
    const notABoards: any[] = ['1', true, Array(19).fill(0), Array(81)];
    notABoards.forEach((notABoard) => {
      expect(() => checkIfValidSection(notABoard, 0)).toThrowError();
    });
  });

  it('should throw an error if second parameter is not a valid section index', () => {
    expect(() => checkIfValidSection([], 9)).toThrowError();
  });

  it('should throw an error if third parameter is not a valid mode', () => {
    const wrongMode: any = 'not a valid mode';
    expect(() => checkIfValidSection([], 0, wrongMode)).toThrowError();
  });

  it('should return false if board section is full', () => {
    expect(checkIfValidSection([0, 1, 2, 3, 9, 10, 11, 18, 19, 20], 0)).toBe(
      false,
    );
  });

  it('should return true if board section is empty', () => {
    expect(checkIfValidSection([], 0)).toBe(true);
  });

  it('should return false if mode === Normal and section is already won', () => {
    expect(checkIfValidSection([0, 19, 1, 20, 2], 0)).toBe(false);
    expect(checkIfValidSection([0, 19, 1, 20, 2], 0, Mode.Continue)).toBe(true);
  });
});
