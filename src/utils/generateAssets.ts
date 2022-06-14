import {Assets, Mode, TileState} from '@src/types';

interface Option {
  mode?: Mode;
}

const generateAssets: (options?: Option) => Assets = (option = {}) => ({
  activeSection: null,
  history: [],
  mode: option.mode === undefined ? Mode.Normal : option.mode,
  sectionStates: new Array(9).fill([TileState.Empty, null]),
  winner: [TileState.Empty, null],
});

export default generateAssets;
