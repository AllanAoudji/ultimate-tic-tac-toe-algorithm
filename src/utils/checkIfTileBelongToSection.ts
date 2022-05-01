import boardSection from '../assets/boardSections';

const checkIfTileBelongToSection: (
  position: number,
  sectionNumber: number | null,
) => boolean = (position, sectionNumber) => {
  if (position >= 81) {
    throw new Error('position out of range');
  }
  if (sectionNumber && sectionNumber >= 9) {
    throw new Error('sectionNumber out of range');
  }

  if (!sectionNumber) {
    return true;
  }

  const belongToSection = boardSection[sectionNumber].includes(position);

  return belongToSection;
};

export default checkIfTileBelongToSection;
