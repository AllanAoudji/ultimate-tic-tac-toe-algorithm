import checkIfAssets from '@src/utils/checkIfAssets';
import generateAssets from '@src/utils/generateAssets';

describe('checkIfAssets', () => {
  it('should return false if arg is not an object', () => {
    const wrongArgs = [1, 'string', true];

    wrongArgs.forEach((wrongArg) => {
      expect(checkIfAssets(wrongArg)).toBe(false);
    });
  });

  it("should return false if arg doesn't have 6 properties", () => {
    const wrongArgs = [
      {},
      {board: new Array(81).fill(TileState.Empty)},
      {board: new Array(81).fill(TileState.Empty), activeSection: 0},
    ];

    wrongArgs.forEach((wrongArg) => {
      expect(checkIfAssets(wrongArg)).toBe(false);
    });
  });

  it('should return false if arg.board does not exist', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.board;
    wrongAssets.boards = [];

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.board is not a valid board', () => {
    const wrongAssets: any = generateAssets();
    wrongAssets.board = [TileState.Empty];

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.history does not exist', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.history;
    wrongAssets.histories = [];

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.history is not a valid history', () => {
    const wrongAssets: any = generateAssets();
    wrongAssets.history = new Array(1);

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.sectionStates does not exist', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.sectionStates;
    wrongAssets.sectionStates = [];

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.sectionStates is not a valid sectionStates', () => {
    const wrongAssets: any = generateAssets();
    wrongAssets.sectionStates = new Array(9);

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.winner does not exist', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.winner;
    wrongAssets.winners = TileState.Empty;

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return false if arg.winner is not a valid winner', () => {
    const wrongAssets: any = generateAssets();
    wrongAssets.winner = 'string';

    expect(checkIfAssets(wrongAssets)).toBe(false);
  });

  it('should return true if arg is valid', () => {
    const assets = generateAssets();

    expect(checkIfAssets(assets)).toBe(true);
  });
});
