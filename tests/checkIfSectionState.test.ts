import checkIfSectionState from '@src/utils/checkIfSectionState';

describe('checkIfSectionState', () => {
  it('should return false if arg is not an array', () => {
    const wrongSectionStates = ['string', 0, true, {}];

    wrongSectionStates.forEach((wrongSectionState) => {
      expect(checkIfSectionState(wrongSectionState)).toBe(false);
    });
  });

  it('should return false if arg is an empty instance of an array', () => {
    const wrongSectionState = new Array(2);

    expect(checkIfSectionState(wrongSectionState)).toBe(false);
  });

  it('should return false if arg is not a 2 length array', () => {
    const wrongSectionState = new Array(3).fill(TileState.Empty);

    expect(checkIfSectionState(wrongSectionState)).toBe(false);
  });

  it('should return false if first index of arg is not a TileState', () => {
    const wrongSectionState = ['string', null];

    expect(checkIfSectionState(wrongSectionState)).toBe(false);
  });

  it('should return false if first index of arg is equal to TileEmpty.Empty and second index of arg is not null', () => {
    const wrongSectionState = [TileState.Empty, WiningLine.BottomRow];

    expect(checkIfSectionState(wrongSectionState)).toBe(false);
  });

  it('should return false if first index of arg is equal to TileEmpty.Player1|Player2 and second index of arg is not a winingLine', () => {
    const wrongSectionState = [TileState.Player1, null];

    expect(checkIfSectionState(wrongSectionState)).toBe(false);
  });

  it('should return true if arg is a valid SectionState', () => {
    const sectionState1 = [TileState.Empty, null];
    const sectionState2 = [TileState.Player1, WiningLine.BottomRow];
    const sectionState3 = [TileState.Player2, WiningLine.BottomRow];

    expect(checkIfSectionState(sectionState1)).toBe(true);
    expect(checkIfSectionState(sectionState2)).toBe(true);
    expect(checkIfSectionState(sectionState3)).toBe(true);
  });
});
