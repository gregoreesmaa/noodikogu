export const INVERT_THEME = '[state] Invert theme';

export const dark = (state = false, action) =>
  action.type === INVERT_THEME
    ? !state
    : state;

export const toggleTheme = () => (
  {
    type: INVERT_THEME
  }
);
