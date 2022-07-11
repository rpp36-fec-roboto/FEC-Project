import React from 'react';
import axios from 'axios';
import sampleData from './data/sampleData.js';
import Overview from './components/Overview/Overview.jsx';
import Qna from './components/qna/qna.jsx';
import RelatedItems from './components/relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // productId: 71699, // default id to render when open the webpage
      // productId: this.props.productId,
      productId: window.location.href.split('/')[4],
      reviewsMeta: sampleData.reviewsMeta,
      yourOutfit: [],
    };
    this.handleAddToYourOutfit = this.handleAddToYourOutfit.bind(this);
    this.handleYourOutfitXClick = this.handleYourOutfitXClick.bind(this);
  }

  componentDidMount() {
    let outfit = JSON.parse(localStorage.getItem('myOutfit')) || [];

    axios.get('reviews/meta', {params: { 'product_id': this.state.productId }})
      .then(response => {
        console.dir(response.data);
        this.setState({
          reviewsMeta: resposne.data,
          yourOutfit: outfit
        });
      })
      .catch( err => console.log(err) );
  }

  handleAddToYourOutfit (productId) {
    let updatedYourOutfit = this.state.yourOutfit.slice();
    let indexOfProduct = this.state.yourOutfit.indexOf(productId);
    // add only if not added yet
    if (indexOfProduct === -1) {
      updatedYourOutfit.unshift(productId);
      this.setState({
        yourOutfit: updatedYourOutfit,
      });
      localStorage.setItem('myOutfit', JSON.stringify(updatedYourOutfit));
    }
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
          yourOutfit={this.state.yourOutfit}
          handleAddToYourOutfit={ () => { this.handleAddToYourOutfit(this.state.productId); } }
          handleRemoveYourOutfit={ () => { this.handleYourOutfitXClick(this.state.productId); }}
        />
        <RelatedItems
          productId={this.state.productId}
          yourOutfit={this.state.yourOutfit}
          onStarClick={this.handleAddToYourOutfit}
          onXClick={this.handleYourOutfitXClick}
        />
        <Qna productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;