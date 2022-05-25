import checkIfValidSection from '@src/utils/checkIfValidSection';
import {Mode, TileState} from '@src/types';

describe('checkIfValidSection', () => {
  let board: TileState[];

  beforeEach(() => {
    board = new Array(81).fill(TileState.Empty);
  });

  it('should throw an error if first parameter is not a valid board', () => {
    const notABoards: any[] = [[], '1', true, Array(19).fill(0), Array(81)];
    notABoards.forEach((notABoard) => {
      expect(() => checkIfValidSection(notABoard, 0)).toThrowError();
    });
  });

  it('should throw an error if second parameter is not a valid section index', () => {
    expect(() => checkIfValidSection(board, 9)).toThrowError();
  });

  it('should throw an error if third parameter is not a valid mode', () => {
    const wrongMode: any = 'not a valid mode';
    expect(() => checkIfValidSection(board, 0, wrongMode)).toThrowError();
  });

  it('should return false if board section is full', () => {
    board[0] = TileState.Player1;
    board[1] = TileState.Player1;
    board[2] = TileState.Player1;
    board[9] = TileState.Player1;
    board[10] = TileState.Player1;
    board[11] = TileState.Player1;
    board[18] = TileState.Player1;
    board[19] = TileState.Player1;
    board[20] = TileState.Player1;
    expect(checkIfValidSection(board, 0)).toBe(false);
  });

  it('should return true if board section is empty', () => {
    expect(checkIfValidSection(board, 0)).toBe(true);
  });

  it('should return false if mode === Normal and section is already won', () => {
    board[0] = TileState.Player1;
    board[1] = TileState.Player1;
    board[2] = TileState.Player1;
    expect(checkIfValidSection(board, 0)).toBe(false);
    expect(checkIfValidSection(board, 0, Mode.Continue)).toBe(true);
  });
});
