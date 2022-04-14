import {Mode} from '@src/types';

const checkIfMode: (item: any) => boolean = (item) => {
  const validMode = [Mode.Continue, Mode.Normal];

  return validMode.includes(item);
};

export default checkIfMode;
