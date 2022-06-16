import {TileState, WiningLine} from '@src/types';
import generateAssets from '@src/utils/generateAssets';
import play from '@src/utils/play';

describe('play', () => {
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

  it('should return same mode as assets.mode arg', () => {
    const assets = generateAssets();

    const {mode} = play(0, assets);
    expect(mode).toBe(assets.mode);
  });

  it('section is won by the move, check if game is won', () => {
    const assets = generateAssets();
    assets.history.push(0, 80, 1, 79, 2, 78, 3, 59, 4, 58, 5, 40, 6, 39, 7, 32);
    const {winner} = play(8, assets);
    expect(winner).toEqual([TileState.Player1, WiningLine.TopRow]);
  });

  it('returns draw', () => {
    const assets = generateAssets();
    assets.history.push(
      0,
      3,
      1,
      4,
      2,
      5,
      6,
      27,
      7,
      28,
      9,
      29,
      30,
      33,
      31,
      34,
      32,
      35,
      57,
      54,
      58,
      55,
      59,
      56,
      78,
      60,
      70,
      61,
      80,
      62,
    );
    const {winner} = play(8, assets);
    expect(winner).toEqual([TileState.Empty, WiningLine.Draw]);
  });
});
