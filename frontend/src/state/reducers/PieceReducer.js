export const PIECE_SELECTED = '[state] Piece selected';
export const PIECE_PARTS_LOADED = '[state] Parts loaded for piece';

export const piece = (state = null, action) =>
  action.type === PIECE_SELECTED
    ? action.piece
    : state;

export const pieceParts = (state = [], action) =>
  action.type === PIECE_PARTS_LOADED
    ? action.parts
    : state;

export const selectPiece = piece => (
  {
    type: PIECE_SELECTED,
    piece
  }
);

export const setPieceParts = parts => (
  {
    type: PIECE_PARTS_LOADED,
    parts
  }
);
