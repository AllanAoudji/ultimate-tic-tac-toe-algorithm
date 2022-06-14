import checkIfTileBelongToSection from './utils/checkIfTileBelongToSection';
import checkIfValidSection from './utils/checkIfValidSection';
import checkIfWon from './utils/checkIfWon';
import convertTo1DArray from './utils/convertTo1DArray';
import convertTo2DArray from './utils/convertTo2DArray';
import generateAssets from './utils/generateAssets';
import getActiveSection from './utils/getActiveSection';
import getIndex1DFrom2D from './utils/getIndex1DFrom2D';
import getIndex2DFrom1D from './utils/getIndex2DFrom1D';
import getPlayerMoves from './utils/getPlayerMoves';
import getSections from './utils/getSections';
import mapMatrix from './utils/mapMatrix';
import play from './utils/play';
import transposeMatrix from './utils/transposeMatrix';
import {
  Assets,
  Index2D,
  Mode,
  Position,
  Section,
  SectionState,
  Tile,
  TileState,
  WiningLine,
} from './types';

export {
  Assets,
  Index2D,
  Mode,
  Position,
  Section,
  SectionState,
  Tile,
  TileState,
  WiningLine,
  checkIfTileBelongToSection,
  checkIfValidSection,
  checkIfWon,
  convertTo1DArray,
  convertTo2DArray,
  generateAssets,
  getActiveSection,
  getIndex1DFrom2D,
  getIndex2DFrom1D,
  getPlayerMoves,
  getSections,
  mapMatrix,
  play,
  transposeMatrix,
};
