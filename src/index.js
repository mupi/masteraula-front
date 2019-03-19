import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
 import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';

import configureStore from './Store';
//import * as serviceWorker from './registerServiceWorker';


const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

//unregister();
registerServiceWorker();

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
