import {Mode, TileState} from '@src/types';
import checkIfMode from '@src/utils/checkIfMode';
import checkIfSectionStates from '@src/utils/checkIfSectionStates';
import generateAssets from '@src/utils/generateAssets';

const assets = generateAssets();

describe('generateAssets', () => {
  it('should return initial history', () => {
    const history = 'history';

    expect(assets).toHaveProperty(history);
    expect(Array.isArray(assets[history])).toBe(true);
    expect(assets[history].length).toBe(0);
    expect(Object.keys(assets[history]).length).toBe(0);
  });

  it('should return initial mode', () => {
    const mode = 'mode';

    expect(assets).toHaveProperty(mode);
    expect(checkIfMode(assets.mode)).toBe(true);
  });

  it('should return initial sectionStates', () => {
    expect(assets).toHaveProperty('sectionStates');
    expect(checkIfSectionStates(assets.sectionStates)).toBe(true);
  });

  it('should return initial winner', () => {
    const winner = 'winner';

    expect(assets).toHaveProperty(winner);
    expect(assets[winner]).toEqual([TileState.Empty, null]);
  });

  it('should change assets.mode based on arg option', () => {
    const assets1 = generateAssets();
    const assets2 = generateAssets({
      mode: Mode.Continue,
    });
    const assets3 = generateAssets({
      mode: Mode.Normal,
    });

    expect(assets1.mode).toBe(Mode.Normal);
    expect(assets2.mode).toBe(Mode.Continue);
    expect(assets3.mode).toBe(Mode.Normal);
  });
});
