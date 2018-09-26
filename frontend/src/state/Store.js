import { createBrowserHistory } from 'history'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { filter, filteredList, menu, piece, pieceParts, players, playlists, playlistsOpen, dark, touchscreen, user, statistics, pieces } from '.';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash-es/throttle';

const rootReducer = combineReducers({
  menu,
  user,
  filter,
  filteredList,
  players,
  playlists,
  playlistsOpen,
  piece,
  pieceParts,
  dark,
  touchscreen,
  statistics,
  pieces
});

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();
export const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

store.subscribe(
  throttle(
    () => saveState(store.getState()),
    1000
  )
);
