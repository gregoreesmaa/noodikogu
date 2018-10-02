export const ADMIN_PIECES_ACTIVE_TAB_CHANGED = '[state] Admin active tab changed';

export const toggledAdminPiecesTab = (state = 0, action) =>
  action.type === ADMIN_PIECES_ACTIVE_TAB_CHANGED
    ? action.id
    : state;

export const adminPiecesTabToggled = (id) => (
  {
    type: ADMIN_PIECES_ACTIVE_TAB_CHANGED,
    id
  }
);

