require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var imageDatas =require('../data/imageData.json');
var imageURL

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}
class Hi extends React.Component{
  render(){
    return(
      <div>
        <span>nimma呵呵大imanimanima</span>
      </div>
    )
  }
}
AppComponent.defaultProps = {
};

export {AppComponent,Hi};
