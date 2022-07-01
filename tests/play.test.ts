import {Mode, TileState, WinningLine} from '@src/types';
import generateAssets from '@src/utils/generateAssets';
import play from '@src/utils/play';
import * as checkIfWon from '@src/utils/checkIfWon';
import * as checkIfSectionDraw from '@src/utils/checkIfDraw';

describe('play', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw an error if tile is out of bound', () => {
    const wrongTile = 90;
    const assets = generateAssets();

    expect(() => play(wrongTile, assets)).toThrow('tile out of bound');
  });

  it('should throw an error if assets is invalide', () => {
    const wrongAssets: any = generateAssets();
    delete wrongAssets.history;

    expect(() => play(0, wrongAssets)).toThrow('assets should be valid');
  });

  it('should throw an error if tile was already played', () => {
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

  it('should return same mode as assets.mode arg', () => {
    const assets = generateAssets();

    const {mode} = play(0, assets);
    expect(mode).toBe(assets.mode);
  });

  it('section is won by the move, check if game is won', () => {
    const assets = generateAssets();
    assets.history.push(6, 39, 7, 32);
    assets.sectionStates[0] = [TileState.Player1, WinningLine.TopRow];
    assets.sectionStates[1] = [TileState.Player1, WinningLine.TopRow];
    const {winner} = play(8, assets);
    expect(winner).toEqual([TileState.Player1, WinningLine.TopRow]);
  });

  it('returns draw', () => {
    const assets = generateAssets();
    assets.history.push(69, 60, 70, 61, 80);
    assets.sectionStates[0] = [TileState.Player1, WinningLine.BottomRow];
    assets.sectionStates[1] = [TileState.Player2, WinningLine.BottomRow];
    assets.sectionStates[2] = [TileState.Player2, WinningLine.BottomRow];
    assets.sectionStates[3] = [TileState.Player2, WinningLine.BottomRow];
    assets.sectionStates[4] = [TileState.Player2, WinningLine.BottomRow];
    assets.sectionStates[5] = [TileState.Player1, WinningLine.BottomRow];
    assets.sectionStates[6] = [TileState.Player1, WinningLine.BottomRow];
    assets.sectionStates[7] = [TileState.Player1, WinningLine.BottomRow];
    const {winner} = play(62, assets);
    expect(winner).toEqual([TileState.Draw, null]);
  });

  it('update only history if section is already won', () => {
    const assets = generateAssets({mode: Mode.Continue});
    jest
      .spyOn(checkIfWon, 'default')
      .mockReturnValue([TileState.Player1, WinningLine.BottomRow]);
    assets.sectionStates[0] = [TileState.Draw, null];
    const {winner} = play(0, assets);
    expect(winner).toEqual([TileState.Empty, null]);
  });

  it('Sets corrent section to draw', () => {
    const assets = generateAssets();
    jest.spyOn(checkIfSectionDraw, 'default').mockReturnValue(true);
    const {sectionStates} = play(0, assets);
    expect(sectionStates[0]).toEqual([TileState.Draw, null]);
  });
});
