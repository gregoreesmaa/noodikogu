export const USER_CHANGED = '[state] User changed';

export const user = (state = null, action) =>
  action.type === USER_CHANGED
    ? action.user
    : state;

export const setUser = (user) => (
  {
    type: USER_CHANGED,
    user
  }
);

export const logIn = (user) => setUser(user);
export const logOut = () => setUser(null);
