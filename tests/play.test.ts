import generateAssets from '@src/utils/generateAssets';
import play from '@src/utils/play';

describe('play', () => {
  it('should throw an error if tile is out of bound', () => {
    const wrongTile = 90;
    const assets = generateAssets();

    expect(() => play(wrongTile, assets)).toThrow('tile out of bound');
  });

  it('should throw an error if assets is not an assets', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.board;

    expect(() => play(0, wrongAssets)).toThrow('assets should be valid');
  });

  it('shouls throw an error if tile was already played', () => {
    const assets: any = generateAssets();
    assets.history.push(0);

    expect(() => play(0, assets)).toThrow('invalid move');
  });

  it('should throw an error if tile is not a valid play (based on history)', () => {
    const assets = generateAssets();

    assets.history.push(1);
    expect(() => play(1, assets)).toThrow('invalid move');
    assets.history.push(11);
    expect(() => play(1, assets)).toThrow('invalid move');
    assets.history.push(40);
    expect(() => play(33, assets)).toThrow('invalid move');
  });

  it('should add tile to assets.history', () => {
    const assets = generateAssets();

    const {history} = play(1, assets);

    expect(history).toEqual([...assets.history, 1]);
  });

  it('should update board', () => {
    const assets = generateAssets();

    const {board: board1} = play(0, assets);
    const returnedBoard1 = [...assets.board];
    returnedBoard1[0] = TileState.Player1;
    expect(board1).toEqual(returnedBoard1);

    // should play more when returned assets gonna be valid
  });

  it('should return same mode as assets.mode arg', () => {
    const assets = generateAssets();

    const {mode} = play(0, assets);
    expect(mode).toBe(assets.mode);
  });

  it('should update accordingly sectionStates if play allow to win a section', () => {
    const assets1 = generateAssets();
    assets1.board[0] = TileState.Player1;
    assets1.board[1] = TileState.Player1;
    const {sectionStates: sectionStates1} = play(2, assets1);
    const expectedSectionStates1 = [...sectionStates1];
    expectedSectionStates1[0] = [TileState.Player1, WiningLine.TopRow];
    expect(sectionStates1).toEqual(expectedSectionStates1);

    const assets2 = generateAssets();
    assets2.board[8] = TileState.Player2;
    assets2.board[26] = TileState.Player2;
    assets2.history = [5];
    const {sectionStates: sectionStates2} = play(17, assets2);
    const expectedSectionStates2 = [...sectionStates2];
    expectedSectionStates2[2] = [TileState.Player2, WiningLine.RightColumn];
    expect(sectionStates2).toEqual(expectedSectionStates2);

    const assets3 = generateAssets();
    const {sectionStates} = play(0, assets3);
    expect(sectionStates).toEqual(assets3.sectionStates);

    const assets4 = generateAssets();
    assets4.sectionStates[0] = [TileState.Player1, WiningLine.TopRow];
    const {sectionStates: sectionStates4} = play(9, assets4);
    expect(sectionStates4).toEqual(assets4.sectionStates);
  });

  it('section is won by the move, check if game is won', () => {
    const assets1 = generateAssets();
    assets1.sectionStates[0] = [TileState.Player1, WiningLine.BottomRow];
    assets1.sectionStates[4] = [TileState.Player1, WiningLine.BottomRow];
    assets1.board[60] = TileState.Player1;
    assets1.board[61] = TileState.Player1;
    const {winner: winner1} = play(62, assets1);
    expect(winner1).toEqual([
      TileState.Player1,
      WiningLine.TopLeftBottomRightDiagonal,
    ]);

    const assets2 = generateAssets();
    const {winner: winner2} = play(7, assets2);
    expect(winner2).toEqual([TileState.Empty, null]);

    const assets3 = generateAssets();
    assets3.sectionStates[1] = [TileState.Player2, WiningLine.BottomRow];
    assets3.sectionStates[2] = [TileState.Player2, WiningLine.BottomRow];
    assets3.board[0] = TileState.Player2;
    assets3.board[10] = TileState.Player2;
    assets3.history = [3];
    const {winner: winner3} = play(20, assets3);
    expect(winner3).toEqual([TileState.Player2, WiningLine.TopRow]);
  });

  it('should return active section', () => {
    const assets = generateAssets();
    const returnAssets1 = play(0, assets);
    expect(returnAssets1.activeSection).toBe(0);
    const returnAssets2 = play(20, returnAssets1);
    expect(returnAssets2.activeSection).toBe(8);
    const returnAssets3 = play(70, returnAssets2);
    expect(returnAssets3.activeSection).toBe(4);
    const returnAssets4 = play(30, returnAssets3);
    expect(returnAssets4.activeSection).toBe(0);
  });
});
