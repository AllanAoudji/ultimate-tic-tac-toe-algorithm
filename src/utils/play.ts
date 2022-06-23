import {Assets, TileState, WinningLine} from '@src/types';

import checkIfAssets from './checkIfAssets';
import checkIfTileBelongToSection from './checkIfTileBelongToSection';
import checkIfWon from './checkIfWon';
import getActiveSection from './getActiveSection';
import getSections from './getSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';

const play: (tile: number, assets: Assets) => Assets = (tile, assets) => {
  if (tile >= 81) {
    throw new Error('tile out of bound');
  }
  if (!checkIfAssets(assets)) {
    throw new Error('assets should be valid');
  }
  if (assets.history.includes(tile)) {
    throw new Error('invalid move');
  }

  const activeSection = getActiveSection(assets.history, assets.mode);

  if (!checkIfTileBelongToSection(tile, activeSection)) {
    throw new Error('invalid move');
  }

  // Update history
  const history = [...assets.history, tile];

  // Check if current section is win by this move.
  const sections = getSections(history);
  const {section: sectionIndex} = getTileIndexPositionAndSection(tile);
  const sectionStates = [...assets.sectionStates];
  const {tiles} = sections[sectionIndex];
  const sectionIsWin = checkIfWon(tiles);
  let winner = assets.winner;

  if (
    sectionIsWin[0] !== TileState.Empty ||
    sectionIsWin[1] === WinningLine.Draw
  ) {
    sectionStates[sectionIndex] = sectionIsWin;
    winner = checkIfWon(sectionStates.map((sectionState) => sectionState[0]));
  }

  return {
    history,
    mode: assets.mode,
    sectionStates,
    winner,
  };
};

export default play;
