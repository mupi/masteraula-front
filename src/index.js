import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import { unregister } from './registerServiceWorker';

import configureStore from './Store';
import * as serviceWorker from './serviceWorker';


const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//unregister();
serviceWorker.register();
 