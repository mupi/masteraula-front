import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'helpers/history';
import App from './App';

// Create Reactp App v1
// import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';

import configureStore from './Store';

// Create Reactp App v2
import * as serviceWorker from './serviceWorker';


const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Create React App v2
serviceWorker.register();

// Create React App v1
// registerServiceWorker();