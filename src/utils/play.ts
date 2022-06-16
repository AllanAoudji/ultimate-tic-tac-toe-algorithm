import {Assets, TileState} from '@src/types';

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

  // Upadate history
  const history = [...assets.history, tile];

  // Check if current section is win by this move.
  const {section} = getTileIndexPositionAndSection(tile);
  let winner = assets.winner;
  const sections = getSections(history);
  const {tiles} = sections[section];
  const sectionIsWin = checkIfWon(tiles);
  if (sectionIsWin[0] !== TileState.Empty) {
    winner = checkIfWon(
      sections.map((section) => checkIfWon(section.tiles)[0]),
    );
  }

  return {
    history,
    mode: assets.mode,
    winner,
  };
};

export default play;
