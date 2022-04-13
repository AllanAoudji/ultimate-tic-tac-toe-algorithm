import checkIfSectionsState from '@src/utils/checkIfSectionsState';

describe('checkIfSectionsState', () => {
  it('should return false if arg is not an array', () => {
    const wrongSectionsStates = ['string', 0, true, {}];

    wrongSectionsStates.forEach((wrongSectionsState) => {
      expect(checkIfSectionsState(wrongSectionsState)).toBe(false);
    });
  });

  it('should return false if arg is an empty instance of an array', () => {
    const wrongSectionsState = new Array(9);

    expect(checkIfSectionsState(wrongSectionsState)).toBe(false);
  });

  it('should return false if arg.length is not equal to 9', () => {
    const wrongSectionsState = new Array(8).fill([TileState.Empty, null]);

    expect(checkIfSectionsState(wrongSectionsState)).toBe(false);
  });

  it('should return false if at least one item of arg is not a section state', () => {
    const wrongSectionsState = new Array(9).fill([TileState.Empty, null]);
    wrongSectionsState[0] = [TileState.Player1, null];

    expect(checkIfSectionsState(wrongSectionsState)).toBe(false);
  });

  it('should return true if arg is a valid sectionsState', () => {
    const sectionState1 = new Array(9).fill([TileState.Empty, null]);
    const sectionState2 = new Array(9).fill([
      TileState.Player1,
      WiningLine.BottomRow,
    ]);
    const sectionState3 = new Array(9).fill([
      TileState.Player2,
      WiningLine.BottomRow,
    ]);
    const sectionState4 = new Array(9).fill([
      TileState.Player2,
      WiningLine.TopRow,
    ]);
    const sectionState5 = new Array(9).fill([TileState.Empty, null]);

    expect(checkIfSectionsState(sectionState1)).toBe(true);
    expect(checkIfSectionsState(sectionState2)).toBe(true);
    expect(checkIfSectionsState(sectionState3)).toBe(true);
    expect(checkIfSectionsState(sectionState4)).toBe(true);
    expect(checkIfSectionsState(sectionState5)).toBe(true);
  });
});
