import {Assets, TileState} from '@src/types';

import checkIfAssets from './checkIfAssets';
import checkIfTileBelongToSection from './checkIfTileBelongToSection';
import checkIfWon from './checkIfWon';
import generateBoardFromHistory from './generateBoardFromHistory';
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

  // Upadate history
  const history = [...assets.history, tile];

  // Check if current section is win by this move.
  const {section} = getTileIndexPositionAndSection(tile);
  const sectionStates = [...assets.sectionStates];
  let winner = assets.winner;
  if (assets.sectionStates[section][1] === null) {
    const {tiles} = getSections(history)[section];
    const sectionIsWin = checkIfWon(tiles);
    // If section is won...
    if (sectionIsWin[0] !== TileState.Empty) {
      // ...update assets.sectionStates
      sectionStates[section] = sectionIsWin;
      // ...and check if game if won
      winner = checkIfWon(sectionStates.map((tile) => tile[0]));
    }
  }

  const test = getActiveSection(history, assets.mode);
  return {
    activeSection: test,
    history,
    mode: assets.mode,
    sectionStates,
    winner,
  };
};

export default play;
