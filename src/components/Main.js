require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

var imageDatas = require('../data/imageData.json');

//取区间值方法
var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);   //这个以后可以通用

imageDatas = (function (imagesNum) {
  for (var i = imagesNum.length; i--;) {
    var imageInfo = imagesNum[i];
    imageInfo.imageUrl = require('../images/' + imageInfo.fileName);   //给当前对象赋值添加imageName属性
    imagesNum[i] = imageInfo;   //重新定义json数据的对象，分别给加了一个imageUrl属性
  }
  return imagesNum;
})(imageDatas);

class ImgFigure extends React.Component {

  render() {
    //初始化最开始的位置
    var styleObj = {};
    //如果props属性中制定了这张图片的位置,则使用
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    return (
      <figure className="img-figure" style={styleObj}>   {/*这个style可以直接是一个对象*/}
        <img src={this.props.data.imageUrl}
             alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}
          </h2>
        </figcaption>
      </figure>
    )
  }
}

//大管家-操作都在这里
class AppComponent extends React.Component {
  //设置模型
  constructor(props) {
    super(props);   //引用超类的constructor属性，因为这个是扩展，所以必须要写上这个
    this.Constant = {
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

    //初始化state 代替以前的getInitialState
    this.state = {
      imgsArrangeArr:[

        //形如下边这样
        //   {
        //   pos:{
        //     left:'0',
        //     top:'0'
        //   }
        // }
      ]
    }
  }


  // 页面加载后计算好位置
  componentDidMount(){

    // 首先拿到舞台大小
    var stageDom = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDom.scrollWidth,
      stageH = stageDom.scrollHeight,
      halfStageW = Math.floor(stageW / 2),
      halfStageH = Math.floor(stageH / 2);

    // 拿到每张图的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
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

    this.rearrange(0);      //全部绑定到this上
    //上边的都是极限值
    // let num = Math.floor(Math.random() * 10);
    // // this.rearrange(num);
    // this.rearrange(num);
  }

  rearrange(centerIndex){
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
      imgsArrangeTopArr = [],       //存储上部图片信息
      topImgNum = Math.floor(Math.random() * 2),  //取0个或者1个随机
      topImgSpliceIndex = 0,                  //给上边图像做一个标记，看是从数组的哪个位置取出来的
      imgsArrangeCenterArr  = imgsArrangeArr.splice(centerIndex, 1);    //取出那个居中的值的数据，返回被提取出来的这个中心图片的信息

    //首先居中 centerIndex 的图片
    imgsArrangeCenterArr[0] = {
      pos: centerPos
    }

    //取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      //布局位于上侧的图片
    imgsArrangeTopArr.forEach(function(value, index) {        //遍历上边取出的几张图片--分别给他们设置坐标
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),      //getRangeRandom这个在上边我们定义一个方法，来随机去除一个值的方法
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        }
      };
    });

    //布局左右两侧的图片
    for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i ++) {    //主要为了分两半，小于i<k的是左侧 i>k的是右侧
      let hPosRangeLORX = null;
      //前半部分布局左边,右半部分布局右边
      if(i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;    //这是一个x区间数组
      } else {
        hPosRangeLORX = hPosRangeRightSecX;   //这是一个x区间数组
      }

      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        }
      }
    }

    //因为下一次点击的话 还是要从新计算，所以还要将imgsArrangeArr 恢复回去
    if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {     //假如上部取到值了

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
  render() {
    var controllerUnits = [],
      imgFigures = [];  //放列表的数组
    imageDatas.forEach(function (value, i) {
      if(!this.state.imgsArrangeArr[i]){    //如果当前土坯那没有初始位置则给他个初始位置
        this.state.imgsArrangeArr[i] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigures.push(<ImgFigure key={i} data={value} ref={'imgFigure'+i} arrange={this.state.imgsArrangeArr[i]} />);  // 这个arrange带有每张图片的状态信息
      //console.log(value.imageUrl)
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export {AppComponent};
