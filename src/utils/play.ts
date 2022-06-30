import {Assets, TileState} from '@src/types';

import checkIfAssets from './checkIfAssets';
import checkIfDraw from './checkIfDraw';
import checkIfTileBelongToSection from './checkIfTileBelongToSection';
import checkIfValidSection from './checkIfValidSection';
import checkIfWon from './checkIfWon';
import convertTo2DArray from './convertTo2DArray';
import getActiveSection from './getActiveSection';
import getSections from './getSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';

const arrayEquals = (firstArray: any, secondArray: any) =>
  Array.isArray(firstArray) &&
  Array.isArray(secondArray) &&
  firstArray.length === secondArray.length &&
  firstArray.every((val, index) => val === secondArray[index]);

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
    sectionStates[sectionIndex][0] === TileState.Draw
  ) {
    return {
      history,
      mode: assets.mode,
      sectionStates,
      winner,
    };
  }

  const sections = getSections(history);
  const {tiles} = sections[sectionIndex];
  const sectionIsWin = checkIfWon(tiles);
  // Update winner && sectionStates only if the move change the current sectionState.
  if (sectionIsWin[0] !== TileState.Empty) {
    sectionStates[sectionIndex] = sectionIsWin;
    winner = checkIfWon(sectionStates.map((sectionState) => sectionState[0]));
    // If the section is not won by the move, check if the section might be a draw
  } else if (checkIfDraw(tiles)) {
    sectionStates[sectionIndex] = [TileState.Draw, null];
  }

  // If the game is not won by the move, and the state of the current section has changed,
  // Check if the game is a draw
  if (
    winner[0] === TileState.Empty &&
    !arrayEquals(
      assets.sectionStates[sectionIndex],
      sectionStates[sectionIndex],
    )
  ) {
    const gameIsADraw = checkIfDraw(
      sectionStates.map((sectionState) => sectionState[0]),
    );
    if (gameIsADraw) {
      winner = [TileState.Draw, null];
    }
  }

  return {
    history,
    mode: assets.mode,
    sectionStates,
    winner,
  };
};

export default play;
