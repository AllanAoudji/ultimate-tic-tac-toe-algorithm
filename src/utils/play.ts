import checkIfAssets from './checkIfAssets';
import checkIfTileBelongToSection from './checkIfTileBelongToSection';
import checkIfWon from './checkIfWon';
import getActiveSection from './getActiveSection';
import getSubSections from './getSubSections';
import getTileIndexPositionAndSection from './getTileIndexPositionAndSection';
import mapMatrix from './mapMatrix';

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

  // TODO:
  // last arg should be assets.mode
  const activeSection = getActiveSection(assets.history, assets.board);

  if (
    activeSection !== null &&
    !checkIfTileBelongToSection(tile, activeSection)
  ) {
    throw new Error('invalid move');
  }

  // Upadate history
  const history = [...assets.history, tile];

  // Update board
  const board = [...assets.board];
  board[tile] = assets.activePlayer;

  // Check if current section is win by this move.
  const {section} = getTileIndexPositionAndSection(tile);
  const sectionStates = [...assets.sectionStates];
  let winner = assets.winner;
  if (assets.sectionStates[section][1] === null) {
    const {tiles} = getSubSections(board)[section];
    const sectionIsWin = checkIfWon(tiles);
    // If section is won...
    if (sectionIsWin[0]) {
      // ...update assets.sectionStates
      sectionStates[section] = sectionIsWin;
      // ...and check if game if won
      winner = checkIfWon(sectionStates.map((tile) => tile[0]))[0];
    }
  }

  // Update active player
  const activePlayer =
    assets.activePlayer === TileState.Player1
      ? TileState.Player2
      : TileState.Player1;

  const test = getActiveSection(history, board);
  return {
    activePlayer,
    activeSection: test,
    board,
    history,
    sectionStates,
    winner,
  };
};

export default play;
