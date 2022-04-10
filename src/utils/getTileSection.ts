import boardSections from './boardSections';

const getTileSection: (position: number) => number = (position) => {
  if (position >= 81) {
    throw new Error('position out of bound');
  }

  const section = boardSections.reduce((previous, current, index) => {
    return current.includes(position) ? index : previous;
  }, 0);

  return section;
};

export default getTileSection;
