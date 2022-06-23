import {Assets, TileState, WinningLine} from '@src/types';

import checkIfAssets from './checkIfAssets';
import checkIfTileBelongToSection from './checkIfTileBelongToSection';
import checkIfValidSection from './checkIfValidSection';
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

  const {section: sectionIndex} = getTileIndexPositionAndSection(tile);

  if (!checkIfValidSection(assets.history, sectionIndex, assets.mode)) {
    throw new Error('invalid move');
  }

  // Update history
  const history = [...assets.history, tile];

  // If current section is already won, update only history
  const sectionStates = [...assets.sectionStates];
  let winner = assets.winner;
  if (
    sectionStates[sectionIndex][0] !== TileState.Empty ||
    sectionStates[sectionIndex][1] === WinningLine.Draw
  ) {
    return {
      history,
      mode: assets.mode,
      sectionStates,
      winner,
    };
  }

  // Update winner && sectionStates only if the move change the current sectionState.
  const sections = getSections(history);
  const {tiles} = sections[sectionIndex];
  const sectionIsWin = checkIfWon(tiles);
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
