import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import Store from './store'

import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter as Router } from 'react-router-dom'

const { store, persistor } = Store()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
