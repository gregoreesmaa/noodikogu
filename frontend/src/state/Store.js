import {createBrowserHistory} from 'history'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {
  dark,
  filter,
  filteredList,
  menu,
  piece,
  pieceParts,
  pieces,
  players,
  playlists,
  playlistsOpen,
  statistics,
  toggledAdminPiece,
  toggledAdminPieceScores,
  touchscreen,
  user
} from './reducers';
import {loadState, saveState} from './localStorage';
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
  pieces,
  toggledAdminPiece,
  toggledAdminPieceScores
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
