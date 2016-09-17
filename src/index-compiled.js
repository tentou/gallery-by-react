'use strict';

require('core-js/fn/object/assign');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Main = require('./components/Main');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('stores/reducers.js');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);
// Render the main component into the dom
_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_Main.AppComponent, null)
), document.getElementById('app'));

//# sourceMappingURL=index-compiled.js.map