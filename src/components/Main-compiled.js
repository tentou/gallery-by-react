'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('normalize.css/normalize.css');
require('styles/App.css');

var imageDatas = require('../data/imageData.json');

//取区间值方法
var getRangeRandom = function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}; //这个以后可以通用
//获取0~30°之间的一个任意正负值
var get30DegRandom = function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
};
imageDatas = function (imagesNum) {
  for (var i = imagesNum.length; i--;) {
    var imageInfo = imagesNum[i];
    imageInfo.imageUrl = require('../images/' + imageInfo.fileName); //给当前对象赋值添加imageName属性
    imagesNum[i] = imageInfo; //重新定义json数据的对象，分别给加了一个imageUrl属性
  }
  return imagesNum;
}(imageDatas);

var ImgFigure = function (_React$Component) {
  _inherits(ImgFigure, _React$Component);

  function ImgFigure(props) {
    _classCallCheck(this, ImgFigure);

    // ★★★★★ 使用ES6 class语法创建组件， class中的方法不会自动将this绑定到实例中。必须使用 .bind(this)或者 箭头函数 ＝>来进行手动绑定，也可以将绑定方法写到constructor中。http://www.cnblogs.com/yongjz/p/5356914.html
    var _this = _possibleConstructorReturn(this, (ImgFigure.__proto__ || Object.getPrototypeOf(ImgFigure)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(ImgFigure, [{
    key: 'handleClick',
    value: function handleClick(e) {

      if (this.props.arrange.isCenter) {
        this.props.inverse();
      } else {
        this.props.center();
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      //初始化最开始的位置
      var styleObj = {};

      //通过props属性得到给分配到的 this.state.imgsArrangeArr[i] = arrange
      if (this.props.arrange.pos) {
        styleObj = this.props.arrange.pos;
      }
      if (this.props.arrange.rotate) {
        ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'].forEach(function (value) {
          styleObj[value] = 'rotate(' + _this2.props.arrange.rotate + 'deg)';
        });
      }
      if (this.props.arrange.isCenter) {
        styleObj.zIndex = 11;
      }
      var imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

      return _react2.default.createElement(
        'figure',
        { className: imgFigureClassName, style: styleObj, onClick: this.handleClick },
        '   ',
        _react2.default.createElement('img', { src: this.props.data.imageUrl,
          alt: this.props.data.title }),
        _react2.default.createElement(
          'figcaption',
          null,
          _react2.default.createElement(
            'h2',
            { className: 'img-title' },
            this.props.data.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'img-back', onClick: this.handleClick },
            '  ',
            _react2.default.createElement(
              'p',
              null,
              this.props.data.desc
            )
          )
        )
      );
    }
  }]);

  return ImgFigure;
}(_react2.default.Component);

var ControllerUnit = function (_React$Component2) {
  _inherits(ControllerUnit, _React$Component2);

  function ControllerUnit(props) {
    _classCallCheck(this, ControllerUnit);

    var _this3 = _possibleConstructorReturn(this, (ControllerUnit.__proto__ || Object.getPrototypeOf(ControllerUnit)).call(this, props));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  _createClass(ControllerUnit, [{
    key: 'handleClick',
    value: function handleClick(e) {
      //如果点击的是当前正是选中的按钮时，则翻转图片
      if (this.props.arrange.isCenter) {
        this.props.inverse();
      } else {
        this.props.center(); //让图片居中，那导航自然就变为选中状态
      }

      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      //判断i对应的图片是否居中，居中的话就添加is-center属性，居中的同时再判断 当前 翻转状态，根据他的翻转状态来定义导航 当前 是否翻转
      var controllerUnitClassName = 'controller-unit';
      if (this.props.arrange.isCenter) {
        controllerUnitClassName += ' is-center';
        if (this.props.arrange.isInverse) {
          controllerUnitClassName += ' is-inverse';
        }
      }
      return _react2.default.createElement('span', { className: controllerUnitClassName, onClick: this.handleClick });
    }
  }]);

  return ControllerUnit;
}(_react2.default.Component);

//大管家-操作都在这里


var AppComponent = function (_React$Component3) {
  _inherits(AppComponent, _React$Component3);

  //设置模型
  function AppComponent(props) {
    _classCallCheck(this, AppComponent);

    //引用超类的constructor属性，因为这个是扩展，所以必须要写上这个

    //整体范围模型
    var _this4 = _possibleConstructorReturn(this, (AppComponent.__proto__ || Object.getPrototypeOf(AppComponent)).call(this, props));

    _this4.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      //水平方向的取值范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      //垂直方向的取值范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };

    //初始状态state 代替以前的getInitialState
    _this4.state = {
      imgsArrangeArr: [

        //形如下边这样
        //   {
        //   pos:{
        //     left:'0',
        //     top:'0'
        //   },
        //  rotate:'0',
        //  isInverse: false,  //图片正反面
        //  isCenter: false //图片是否居中
        // }
      ]
    };
    return _this4;
  }

  _createClass(AppComponent, [{
    key: 'inverse',
    value: function inverse(index) {
      var _this5 = this;

      return function () {
        var imgsArrangeArr = _this5.state.imgsArrangeArr;

        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
        _this5.setState({
          imgsArrangeArr: imgsArrangeArr
        });
      };
    }

    // 页面加载后计算好位置

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      // 首先拿到舞台大小
      var stageDom = _reactDom2.default.findDOMNode(this.refs.stage),
          stageW = stageDom.scrollWidth,
          stageH = stageDom.scrollHeight,
          halfStageW = Math.floor(stageW / 2),
          halfStageH = Math.floor(stageH / 2);

      // 拿到每张图的大小
      var imgFigureDOM = _reactDom2.default.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.floor(imgW / 2),
          halfImgH = Math.floor(imgH / 2);

      // 页面加载后 中间图片 的位置
      this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      };
      //计算左侧右侧图片区域排布位置的取值范围--极限值
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;

      //计算垂直排布位置的取值范围--极限值
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

      this.Constant.vPosRange.x[0] = halfImgW - imgW;
      this.Constant.vPosRange.x[1] = halfImgW;

      this.rearrange(0); //全部绑定到this上
      //上边的都是极限值
      // let num = Math.floor(Math.random() * 10);
      // // this.rearrange(num);
      // this.rearrange(num);
    }
  }, {
    key: 'rearrange',
    value: function rearrange(centerIndex) {
      //重新排布图片

      //先取到图片坐标数组
      var imgsArrangeArr = this.state.imgsArrangeArr,
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,
          imgsArrangeTopArr = [],
          //存储上部图片信息
      topImgNum = Math.floor(Math.random() * 2),
          //取0个或者1个随机
      topImgSpliceIndex = 0,
          //给上边图像做一个标记，看是从数组的哪个位置取出来的
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1); //取出那个居中的值的数据，返回被提取出来的这个中心图片的信息

      //首先居中 centerIndex 的图片
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        //rotate:'0',
        isCenter: true
      };

      //取出要布局上侧的图片的状态信息
      topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      //布局位于上侧的图片
      imgsArrangeTopArr.forEach(function (value, index) {
        //遍历上边取出的几张图片--分别给他们设置坐标
        imgsArrangeTopArr[index] = {
          pos: {
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]), //getRangeRandom这个在上边我们定义一个方法，来随机去除一个值的方法
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: get30DegRandom(),
          isCenter: false

        };
      });

      //布局左右两侧的图片
      for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
        //主要为了分两半，小于i<k的是左侧 i>k的是右侧
        var hPosRangeLORX = null;
        //前半部分布局左边,右半部分布局右边
        if (i < k) {
          hPosRangeLORX = hPosRangeLeftSecX; //这是一个x区间数组
        } else {
          hPosRangeLORX = hPosRangeRightSecX; //这是一个x区间数组
        }

        imgsArrangeArr[i] = {
          pos: {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          },
          rotate: get30DegRandom(),
          isCenter: false
        };
      }

      //因为下一次点击的话 还是要从新计算，所以还要将imgsArrangeArr 恢复回去
      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        //假如上部取到值了

        //将上边图片插回去
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      //将中间图像插回去
      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      //触发重新渲染---★
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }
  }, {
    key: 'center',
    value: function center(index) {
      var _this6 = this;

      return function () {
        _this6.rearrange(index);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var controllerUnits = [],
          imgFigures = []; //放列表的数组
      imageDatas.forEach(function (value, i) {
        if (!this.state.imgsArrangeArr[i]) {
          //如果当前土坯那没有初始位置则给他个初始位置
          this.state.imgsArrangeArr[i] = {
            pos: {
              left: 0,
              top: 0
            },
            rotate: 0,
            isInverse: false,
            isCenter: false //图片是否居中
          };
        }
        imgFigures.push(_react2.default.createElement(ImgFigure, { key: i, data: value, ref: 'imgFigure' + i, arrange: this.state.imgsArrangeArr[i], inverse: this.inverse(i), center: this.center(i) })); // 这个arrange带有每张图片的状态信息
        //console.log(value.imageUrl)
        controllerUnits.push(_react2.default.createElement(ControllerUnit, { key: i, arrange: this.state.imgsArrangeArr[i], inverse: this.inverse(i), center: this.center(i) })); //key = {i}是用来实现React的diff功能的
      }.bind(this));

      return _react2.default.createElement(
        'section',
        { className: 'stage', ref: 'stage' },
        _react2.default.createElement(
          'section',
          { className: 'img-sec' },
          imgFigures
        ),
        _react2.default.createElement(
          'nav',
          { className: 'controller-nav' },
          controllerUnits
        )
      );
    }
  }]);

  return AppComponent;
}(_react2.default.Component);

AppComponent.defaultProps = {};

exports.AppComponent = AppComponent;

//# sourceMappingURL=Main-compiled.js.map