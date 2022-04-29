import {Mode} from '@src/types';
import checkIfMode from '@src/utils/checkIfMode';

describe('checkIfMode', () => {
  it('should return true if arg[0] is a valid Mode', () => {
    const modes = [Mode.Continue, Mode.Normal];

    modes.forEach((mode) => {
      expect(checkIfMode(mode)).toBe(true);
    });
  });

  it('should return false if arg[0] is not a valid Mode', () => {
    const notMode = [
      'string',
      false,
      10,
      [Mode.Continue],
      {mode: Mode.Continue},
    ];

    notMode.forEach((mode) => {
      expect(checkIfMode(mode)).toBe(false);
    });
  });
});
