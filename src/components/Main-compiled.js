'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hi = exports.AppComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('normalize.css/normalize.css');
require('styles/App.css');

var imageDatas = require('../data/imageData.json');
var imageURL;

var yeomanImage = require('../images/yeoman.png');

var AppComponent = function (_React$Component) {
  _inherits(AppComponent, _React$Component);

  function AppComponent() {
    _classCallCheck(this, AppComponent);

    return _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).apply(this, arguments));
  }

  _createClass(AppComponent, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'index' },
        _react2.default.createElement('img', { src: yeomanImage, alt: 'Yeoman Generator' }),
        _react2.default.createElement(
          'div',
          { className: 'notice' },
          'Please edit ',
          _react2.default.createElement(
            'code',
            null,
            'src/components/Main.js'
          ),
          ' to get started!'
        )
      );
    }
  }]);

  return AppComponent;
}(_react2.default.Component);

var Hi = function (_React$Component2) {
  _inherits(Hi, _React$Component2);

  function Hi() {
    _classCallCheck(this, Hi);

    return _possibleConstructorReturn(this, (Hi.__proto__ || Object.getPrototypeOf(Hi)).apply(this, arguments));
  }

  _createClass(Hi, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          null,
          'nimma呵呵大imanimanima'
        )
      );
    }
  }]);

  return Hi;
}(_react2.default.Component);

AppComponent.defaultProps = {};

exports.AppComponent = AppComponent;
exports.Hi = Hi;

//# sourceMappingURL=Main-compiled.js.map