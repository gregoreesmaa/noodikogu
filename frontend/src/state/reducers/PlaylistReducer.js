export const PLAYLISTS_LOADED = '[state] Playlists loaded';
export const PLAYLIST_TOGGLED = '[state] Playlist toggled';

export const playlists = (state = [], action) =>
  action.type === PLAYLISTS_LOADED
    ? action.playlists
    : state;

export const playlistsOpen = (state = {}, action) =>
  action.type === PLAYLIST_TOGGLED
    ? Object.assign({}, state, { [action.id]: !state[action.id] })
    : state;

export const playlistsLoaded = (playlists) => (
  {
    type: PLAYLISTS_LOADED,
    playlists
  }
);

export const togglePlaylist = (id) => (
  {
    type: PLAYLIST_TOGGLED,
    id
  }
);
