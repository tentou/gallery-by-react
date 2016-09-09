'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppComponent = undefined;

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

imageDatas = function (imagesNum) {
  for (var i = imagesNum.length; i--;) {
    var imageInfo = imagesNum[i];
    imageInfo.imageUrl = require('../images/' + imageInfo.fileName); //给当前对象赋值添加imageName属性
    imagesNum[i] = imageInfo; //重新定义json数据的对象，分别给加了一个imageUrl属性
  }
  return imagesNum;
  console.log(imagesNum);
}(imageDatas);

var yeomanImage = require('../images/yeoman.png');

var ImgFigure = function (_React$Component) {
  _inherits(ImgFigure, _React$Component);

  function ImgFigure() {
    _classCallCheck(this, ImgFigure);

    return _possibleConstructorReturn(this, (ImgFigure.__proto__ || Object.getPrototypeOf(ImgFigure)).apply(this, arguments));
  }

  _createClass(ImgFigure, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'figure',
        null,
        _react2.default.createElement('img', { src: this.props.data.imageUrl,
          alt: this.props.data.title }),
        _react2.default.createElement(
          'figcaption',
          null,
          _react2.default.createElement(
            'h2',
            { className: 'img-title' },
            this.props.data.title
          )
        )
      );
    }
  }]);

  return ImgFigure;
}(_react2.default.Component);

//大管家-操作都在这里


var AppComponent = function (_React$Component2) {
  _inherits(AppComponent, _React$Component2);

  function AppComponent() {
    _classCallCheck(this, AppComponent);

    return _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).apply(this, arguments));
  }

  _createClass(AppComponent, [{
    key: 'render',
    value: function render() {
      var imgFigures = [];
      imageDatas.forEach(function (value, i) {
        imgFigures.push(_react2.default.createElement(ImgFigure, { key: i, data: value }));
        //console.log(value.imageUrl)
      });

      return _react2.default.createElement(
        'section',
        { className: 'stage' },
        _react2.default.createElement(
          'section',
          { className: 'img-sec' },
          imgFigures
        ),
        _react2.default.createElement('nav', { className: 'controller-nav' })
      );
    }
  }]);

  return AppComponent;
}(_react2.default.Component);

AppComponent.defaultProps = {};

exports.AppComponent = AppComponent;

//# sourceMappingURL=Main-compiled.js.map