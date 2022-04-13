import generateAssets from '@src/utils/generateAssets';

const assets = generateAssets();

describe('generateAssets', () => {
  it('should return initial active player', () => {
    const activePlayer = 'activePlayer';

    expect(assets).toHaveProperty(activePlayer);
    expect(assets[activePlayer]).toBe(TileState.Player1);
  });

  it('should return initial active section', () => {
    const activeSection = 'activeSection';

    expect(assets).toHaveProperty(activeSection);
    expect(assets[activeSection]).toBe(null);
  });

  it('should return initial board', () => {
    const board = 'board';

    expect(assets).toHaveProperty(board);
    expect(Array.isArray(assets[board])).toBe(true);
    expect(assets[board].length).toBe(81);
    expect(Object.keys(assets[board]).length).toBe(81);
    expect(assets[board].some((item) => item === TileState.Empty)).toBe(true);
  });

  it('should return initial history', () => {
    const history = 'history';

    expect(assets).toHaveProperty(history);
    expect(Array.isArray(assets[history])).toBe(true);
    expect(assets[history].length).toBe(0);
    expect(Object.keys(assets[history]).length).toBe(0);
  });

  it('should return initial sections state', () => {
    const sectionsState = 'sectionsState';

    expect(assets).toHaveProperty(sectionsState);
    expect(Array.isArray(assets[sectionsState])).toBe(true);
    expect(assets[sectionsState].length).toBe(9);
    expect(Object.keys(assets[sectionsState]).length).toBe(9);
    assets[sectionsState].forEach((sectionState) => {
      expect(sectionState).toEqual([TileState.Empty, null]);
    });
  });

  it('should return initial winner', () => {
    const winner = 'winner';

    expect(assets).toHaveProperty(winner);
    expect(assets[winner]).toBe(TileState.Empty);
  });
});
