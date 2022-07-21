import React from 'react';
import axios from 'axios';
import sampleData from './data/sampleData.js';

import OverviewWithTracker from './components/Overview/Overview.jsx';
import QnaWithTracker from './components/qna/qna.jsx';
import RelatedItemsWithTracker from './components/relatedItems/RelatedItems.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import ErrorBoundary from './components/Sharables/ErrorBoundary.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: window.location.href.split('/')[3], // get productId from url
      relatedProduct: [],
      productInfo: {},
      yourOutfit: JSON.parse(localStorage.getItem('myOutfit')) || []
    };
    this.getRelatedProduct = this.getRelatedProduct.bind(this);
    this.handleAddToYourOutfit = this.handleAddToYourOutfit.bind(this);
    this.handleChangeProductId = this.handleChangeProductId.bind(this);
    this.handleRemoveFromYourOutfit = this.handleRemoveFromYourOutfit.bind(this);
  }

  componentDidMount() {
    this.getRelatedProduct(this.state.productId);
    this.getProductInfo(this.state.productId);
  }

  getRelatedProduct (productId) {
    axios.get(`/products/${productId}/related`)
      .then((response) => {
        this.setState({
          relatedProduct: response.data
        });
      })
      .catch( err => { console.log(err); });
  }

  getProductInfo (productId) {
    axios.get(`products/${productId}`)
      .then(response => {
        this.setState({ productInfo: response.data
        });
      })
      .catch( err => { console.log(err); });
  }

  handleAddToYourOutfit (productId) {
    event.preventDefault();
    productId = Number(productId);
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

  handleChangeProductId (selectedProductId) {
    this.setState({
      productId: selectedProductId
    }, () => {
      window.history.replaceState('object or string', 'Title', '/'.concat(selectedProductId));
      this.getRelatedProduct(selectedProductId);
      this.getProductInfo(selectedProductId);
    });
  }

  handleRemoveFromYourOutfit (productId) {
    event.preventDefault();
    const updatedYourOutfit = this.state.yourOutfit.slice();
    const indexOfProduct = this.state.yourOutfit.indexOf(Number(productId));
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
      <>
        <OverviewWithTracker
          productId={this.state.productId}
          productInfo={this.state.productInfo}
          yourOutfit={this.state.yourOutfit}
          handleAddToYourOutfit={ () => { this.handleAddToYourOutfit(this.state.productId); } }
          handleRemoveFromYourOutfit={ () => { this.handleRemoveFromYourOutfit(this.state.productId); } }/>
        <RelatedItemsWithTracker
          productId={this.state.productId}
          relatedProduct={this.state.relatedProduct}
          yourOutfit={this.state.yourOutfit}
          onCardClick={this.handleChangeProductId}
          onStarClick={this.handleAddToYourOutfit}
          onXClick={this.handleRemoveFromYourOutfit}/>
        <QnaWithTracker productId={this.state.productId}/>
        <Reviews />
      </>
    );
  }
}

export default App;