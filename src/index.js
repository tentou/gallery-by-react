import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppComponent,Hi} from './components/Main';

// Render the main component into the dom
ReactDOM.render(<div><AppComponent /><Hi /></div>, document.getElementById('app'));
