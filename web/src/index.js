import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';

import thunkMiddleware from 'redux-thunk';
import { expensesApp } from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';

const logger = createLogger({ collapsed: true, diff: true });

const store = createStore(
  expensesApp,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
