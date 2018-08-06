export const PLAYERS_LOADED = '[state] Players loaded';

export const players = (state = [], action) =>
  action.type === PLAYERS_LOADED
    ? action.players
    : state;

export const playersLoaded = (players) => (
  {
    type: PLAYERS_LOADED,
    players
  }
);
