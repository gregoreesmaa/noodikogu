export const MENU_TOGGLED = '[state] Menu toggled';

export const menu = (state = false, action) =>
  action.type === MENU_TOGGLED
    ? action.open
    : state;

export const toggleMenu = (open) => (
  {
    type: MENU_TOGGLED,
    open
  }
);
export const openMenu = () => toggleMenu(true);
export const closeMenu = () => toggleMenu(false);
