'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

// let yeomanImage = require('../images/yeoman.png');

var imageDatas = require('../data/imageData.json');

/**
 *获取图片相关的数据
 *利用自执行函数,将图片信息转换成图片URL路径信息
 */
imageDatas = function genImageURL(imageDatasArr) {
    for (var i = 0; i < imageDatasArr.length; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
}(imageDatas);

//获取区间内的随机值
var getRangeRandom = function getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
};

//获取0~30°之间的一个任意正负值
var get30DegRandom = function get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
};

var ImgFigure = function (_React$Component) {
    _inherits(ImgFigure, _React$Component);

    function ImgFigure(props) {
        _classCallCheck(this, ImgFigure);

        var _this = _possibleConstructorReturn(this, (ImgFigure.__proto__ || Object.getPrototypeOf(ImgFigure)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    /**
     * imgFigure的点击处理函数
     */

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

            var styleObj = {};

            //如果props属性中制定了这张图片的位置,则使用
            if (this.props.arrange.pos) {
                styleObj = this.props.arrange.pos;
            }

            //如果图片的旋转角度有值并且不为0,添加旋转角度
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
                _react2.default.createElement('img', { src: this.props.data.imageURL,
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

//控制组件


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
            //如果点击的是当前正在选中的按钮,则翻转图片,否则将对应的图片居中
            if (this.props.arrange.isCenter) {
                this.props.inverse();
            } else {
                this.props.center();
            }

            e.preventDefault();
            e.stopPropagation();
        }
    }, {
        key: 'render',
        value: function render() {
            var controllerUnitClassName = 'controller-unit';

            //如果对应的居中的图片,显示控制按钮的剧中态
            if (this.props.arrange.isCenter) {
                controllerUnitClassName += ' is-center';

                //如果对应的是翻转图片,显示控制状态的翻转状态
                if (this.props.arrange.isInverse) {
                    controllerUnitClassName += ' is-inverse';
                }
            }

            return _react2.default.createElement('span', { className: controllerUnitClassName, onClick: this.handleClick });
        }
    }]);

    return ControllerUnit;
}(_react2.default.Component);

var AppComponent = function (_React$Component3) {
    _inherits(AppComponent, _React$Component3);

    function AppComponent(props) {
        _classCallCheck(this, AppComponent);

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

        _this4.state = {
            imgsArrangeArr: [
                /**
                 *  {
                 *      pos: {
                 *          left: '0',
                 *          top: '0'
                 *      },
                 *      rotate: 0,
                 *      isInverse: false,  //图片正反面
                 *      isCenter: false //图片是否居中
                 *  }
                 */
            ]
        };
        return _this4;
    }

    /**
     * 翻转图片
     * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
     * @return {Function} 这是一个闭包函数,其内return一个真正待被执行的函数
     */

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

        //组件加载以后,为每张图片计算其位置的范围

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            //首先拿到舞台的大小
            var stageDom = _reactDom2.default.findDOMNode(this.refs.stage),

            // let stageDom = this.refs.stage,
            stageW = stageDom.scrollWidth,
                stageH = stageDom.scrollHeight,
                halfStageW = Math.floor(stageW / 2),
                halfStageH = Math.floor(stageH / 2);

            var imgFigureDOM = _reactDom2.default.findDOMNode(this.refs.imgFigure0),
                imgW = imgFigureDOM.scrollWidth,
                imgH = imgFigureDOM.scrollHeight,
                halfImgW = Math.floor(imgW / 2),
                halfImgH = Math.floor(imgH / 2);
            /**
             * 计算中心图片的位置点
             */
            this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            };

            //计算左侧右侧图片区域排布位置的取值范围
            this.Constant.hPosRange.leftSecX[0] = -halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

            this.Constant.hPosRange.y[0] = -halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;

            //计算左侧右侧图片区域排布位置的取值范围
            this.Constant.vPosRange.topY[0] = -halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

            this.Constant.vPosRange.x[0] = halfImgW - imgW;
            this.Constant.vPosRange.x[1] = halfImgW;
            var num = Math.floor(Math.random() * 10);
            // this.rearrange(num);
            this.rearrange(num);
        }

        /**
         *重新布局所有图片
         *@param: centerIndex 指定居中排布那个图片
         */

    }, {
        key: 'rearrange',
        value: function rearrange(centerIndex) {
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
                topImgNum = Math.floor(Math.random() * 2),
                topImgSpliceIndex = 0,
                imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            //首先居中centerIndex的图片,居中的centerIndex的图片不需要旋转
            imgsArrangeCenterArr[0] = {
                pos: centerPos,
                rotate: 0,
                isCenter: true
            };

            //取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));

            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
            //布局位于上侧的图片
            imgsArrangeTopArr.forEach(function (value, index) {
                imgsArrangeTopArr[index] = {
                    pos: {
                        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                    },
                    rotate: get30DegRandom(),
                    isCenter: false
                };

                imgsArrangeTopArr[index].pos = {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                };
            });

            //布局左右两侧的图片
            for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
                var hPosRangeLORX = null;
                //前半部分布局左边,右半部分布局右边
                if (i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
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
            if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }
            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }

        /**
         * 利用 rearrange函数, 居中对应index的图片
         * @param index,需要被居中的图片对应的图片信息数组的index值
         * @return {function}
         */

    }, {
        key: 'center',
        value: function center(index) {
            var _this6 = this;

            return function () {
                _this6.rearrange(index);
            };
        }

        // getInitialState() {
        //     return {
        //         imgsArrangeArr: []
        //     };
        // }

    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var controllerUnits = [];
            var imgFigures = [];

            imageDatas.map(function (value, index) {
                if (!_this7.state.imgsArrangeArr[index]) {
                    _this7.state.imgsArrangeArr[index] = {
                        pos: {
                            left: 0,
                            top: 0
                        },
                        rotate: 0,
                        isInverse: false,
                        isCenter: false
                    };
                }
                imgFigures.push(_react2.default.createElement(ImgFigure, { data: value, key: index, ref: 'imgFigure' + index,
                    arrange: _this7.state.imgsArrangeArr[index],
                    inverse: _this7.inverse(index),
                    center: _this7.center(index) }));
                controllerUnits.push(_react2.default.createElement(ControllerUnit, { key: index, arrange: _this7.state.imgsArrangeArr[index],
                    inverse: _this7.inverse(index),
                    center: _this7.center(index) }));
            });

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

exports.default = AppComponent;

//# sourceMappingURL=Main-compiled.js.map