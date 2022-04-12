import checkIfHistory from './checkIfHistory';

const getActivePlayer: (history: number[]) => number = (history) => {
  if (!checkIfHistory(history)) {
    throw new Error('arg should be a valid history');
  }

  return history.length % 2;
};

export default getActivePlayer;
