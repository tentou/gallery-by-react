'use strict';

require('core-js/fn/object/assign');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Main = require('./components/Main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Render the main component into the dom
_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_Main.AppComponent, null),
  _react2.default.createElement(_Main.Hi, null)
), document.getElementById('app'));

//# sourceMappingURL=index-compiled.js.map