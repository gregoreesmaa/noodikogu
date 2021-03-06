import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './state';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
//registerServiceWorker();
