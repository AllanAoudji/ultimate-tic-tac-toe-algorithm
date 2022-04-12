const checkIfHistory: (history: number[]) => boolean = (history) => {
  if (
    !Array.isArray(history) ||
    history.length !== Object.keys(history).length ||
    history.length > 81 ||
    history.some((item) => typeof item !== 'number') ||
    new Set(history).size !== history.length ||
    history.some((item) => item > 80)
  ) {
    return false;
  }

  return true;
};

export default checkIfHistory;
