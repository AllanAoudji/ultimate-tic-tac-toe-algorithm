import {Assets, Mode, TileState} from '@src/types';

interface Option {
  mode?: Mode;
}

const generateAssets: (options?: Option) => Assets = (option = {}) => ({
  history: [],
  mode: option.mode === undefined ? Mode.Normal : option.mode,
  winner: [TileState.Empty, null],
});

export default generateAssets;
