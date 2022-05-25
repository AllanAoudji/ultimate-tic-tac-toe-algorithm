import {Position} from '@src/types';

import boardSections from '../assets/boardSections';

interface IndexPositionAndSection {
  // Current position relative to the section
  index: number;
  // Current enum position relative to the section
  position: Position;
  // Index of the relative section
  section: number;
}

const getTileIndexPositionAndSection: (
  position: number,
) => IndexPositionAndSection = (position) => {
  if (position < 0 || position >= 81) {
    throw new Error('position out of bound');
  }

  const positions = [
    Position.TopLeft,
    Position.TopMiddle,
    Position.TopRight,
    Position.MiddleLeft,
    Position.MiddleMiddle,
    Position.MiddleRight,
    Position.BottomLeft,
    Position.BottomMiddle,
    Position.BottomRight,
  ];

  const section = boardSections.reduce(
    (previous, current, index) => {
      if (current.includes(position)) {
        return {
          section: index,
          position: positions[current.indexOf(position)],
          index: current.indexOf(position),
        };
      } else {
        return previous;
      }
    },
    {index: 0, position: Position.TopLeft, section: 0},
  );

  return section;
};

export default getTileIndexPositionAndSection;
