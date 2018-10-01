export const ADMIN_ACTIVE_PIECE_CHANGED = '[state] Admin active piece changed';
export const ADMIN_ACTIVE_PIECE_SCORES_LOADED = '[state] Admin active piece scores loaded';

export const toggledAdminPiece = (state = -1, action) =>
  action.type === ADMIN_ACTIVE_PIECE_CHANGED
    ? action.id === state ? -1 : action.id
    : state;

export const toggledAdminPieceScores = (state = [], action) =>
  action.type === ADMIN_ACTIVE_PIECE_SCORES_LOADED
    ? action.scores
    : state;

export const adminPieceToggled = (id) => (
  {
    type: ADMIN_ACTIVE_PIECE_CHANGED,
    id
  }
);

export const adminPieceScoresLoaded = (scores) => (
  {
    type: ADMIN_ACTIVE_PIECE_SCORES_LOADED,
    scores
  }
);
