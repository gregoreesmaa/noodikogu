export const PIECES_LOADED = '[state] Pieces loaded';

export const pieces = (state = [], action) =>
  action.type === PIECES_LOADED
    ? action.pieces
    : state;


export const piecesLoaded = (pieces) => (
  {
    type: PIECES_LOADED,
    pieces
  }
);
