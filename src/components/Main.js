require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imageDatas = require('../data/imageData.json');

imageDatas = (function (imagesNum) {
  for (var i = imagesNum.length; i--;) {
    var imageInfo = imagesNum[i];
    imageInfo.imageUrl = require('../images/' + imageInfo.fileName);   //给当前对象赋值添加imageName属性
    imagesNum[i] = imageInfo;   //重新定义json数据的对象，分别给加了一个imageUrl属性
  }
  return imagesNum;
  console.log(imagesNum)
})(imageDatas);


let yeomanImage = require('../images/yeoman.png');

class ImgFigure extends React.Component{
  render() {
    return(
      <figure>
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
  render() {
    var imgFigures = [];
    imageDatas.forEach(function (value,i) {
      imgFigures.push(<ImgFigure key={i} data={value} />)
      //console.log(value.imageUrl)
    });


    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export {AppComponent};
