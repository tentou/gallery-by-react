import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppComponent} from './components/Main';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import todoApp from 'stores/reducers.js'

let store = createStore(todoApp);
// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
);
