import checkIfHistory from '@src/utils/checkIfHistory';

describe('checkIfHistory', () => {
  it('should return false if arg is not an array', () => {
    const wrongArgs: any[] = ['string', 1, {}, true];

    wrongArgs.forEach((wrongArg) => {
      expect(checkIfHistory(wrongArg)).toBe(false);
    });
  });

  it('should return false if arg is an empty instance of Array', () => {
    const emptyArray = new Array(9);

    expect(checkIfHistory(emptyArray)).toBe(false);
  });

  it('should return false if array.length is > 81', () => {
    const outOfBoundArray = Array.from(Array(82).keys());

    expect(checkIfHistory(outOfBoundArray)).toBe(false);
  });

  it('should return false if one of the item is not a number', () => {
    const outOfBoundItems: any[] = ['90'];

    expect(checkIfHistory(outOfBoundItems)).toBe(false);
  });

  it('should return false if one of the item of history is > 80', () => {
    const outOfBoundItems = [90];

    expect(checkIfHistory(outOfBoundItems)).toBe(false);
  });

  it('should return false if one of the item is equal to another', () => {
    const wrongItems = new Array(2).fill(0);

    expect(checkIfHistory(wrongItems)).toBe(false);
  });

  it('should return true if array.length < 81 and all items are different number < 81', () => {
    const history = Array.from(Array(81).keys());

    expect(checkIfHistory(history)).toBe(true);
  });
});
