import React from 'react';
import sampleData from './data/sampleData.js';
import Overview from './components/Overview/Overview.jsx';
import Qna from './components/qna/qna.jsx';
import RelatedItems from './components/relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 71697, // default id to render when open the webpage
      reviewsMeta: sampleData.reviewsMeta,
      yourOutfit: [],
      isYourOutfit: false
    };
    this.handleYourOutfitStarClick = this.handleYourOutfitStarClick.bind(this);
    this.handleYourOutfitXClick = this.handleYourOutfitXClick.bind(this);
  }

  componentDidMount() {
    let outfit = JSON.parse(localStorage.getItem('myOutfit'));
    if (outfit !== null) {
      this.setState({
        yourOutfit: outfit
      });
    }
  }

  handleYourOutfitStarClick (productId) {
    // make a copy of yourOutfit
    var updatedYourOutfit = this.state.yourOutfit.slice();
    var indexOfProduct = this.state.yourOutfit.indexOf(productId);

    if (indexOfProduct === -1) {
      updatedYourOutfit.unshift(productId);
      this.setState({
        yourOutfit: updatedYourOutfit,
        isYourOutfit: !this.state.isYourOutfit
      });
    } else {
      this.state.yourOutfit.splice(indexOfProduct, 1);
      // updatedYourOutfit.splice(indexOfProduct, 1);
      this.setState({
        yourOutfit: updatedYourOutfit,
        isYourOutfit: !this.state.isYourOutfit
      });
    }
    localStorage.setItem('myOutfit', JSON.stringify(updatedYourOutfit));
  }

  handleYourOutfitXClick (productId) {
    const updatedYourOutfit = this.state.yourOutfit.slice();
    const indexOfProduct = this.state.yourOutfit.indexOf(productId);
    if (indexOfProduct !== -1) {
      updatedYourOutfit.splice(indexOfProduct, 1);
      this.setState({
        yourOutfit: updatedYourOutfit
      });
      localStorage.setItem('myOutfit', JSON.stringify(updatedYourOutfit));
    }
  }

  render() {
    return (
      <div>
        <Overview
          productId={this.state.productId}
          reviewsMeta={this.state.reviewsMeta}
          isYourOutfit={this.state.isYourOutfit}
          handleYourOutfitStarClick={ () => { this.handleYourOutfitStarClick(this.state.productId); } }
        />
        <RelatedItems
          productId={this.state.productId}
          yourOutfit={this.state.yourOutfit}
          onStarClick={this.handleYourOutfitStarClick}
          onXClick={this.handleYourOutfitXClick}
        />
        <Qna productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;