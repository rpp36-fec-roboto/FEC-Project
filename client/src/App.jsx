import React from 'react';
import axios from 'axios';
import sampleData from './data/sampleData.js';
import Overview from './components/Overview/Overview.jsx';
import Qna from './components/qna/qna.jsx';
import RelatedItems from './components/relatedItems/RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: window.location.href.split('/')[3], // get userId from url
      yourOutfit: [],
    };
    this.handleAddToYourOutfit = this.handleAddToYourOutfit.bind(this);
    this.handleRemoveFromYourOutfit = this.handleRemoveFromYourOutfit.bind(this);
  }

  componentDidMount() {
    let outfit = JSON.parse(localStorage.getItem('myOutfit')) || [];
    this.setState({
      yourOutfit: outfit
    });
  }

  handleAddToYourOutfit (productId) {
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

  handleRemoveFromYourOutfit (productId) {
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
      <div>
        <Overview
          productId={this.state.productId}
          yourOutfit={this.state.yourOutfit}
          handleAddToYourOutfit={ () => { this.handleAddToYourOutfit(this.state.productId); } }
          handleRemoveFromYourOutfit={ () => { this.handleRemoveFromYourOutfit(this.state.productId); }}
        />
        <RelatedItems
          productId={this.state.productId}
          yourOutfit={this.state.yourOutfit}
          onStarClick={this.handleAddToYourOutfit}
          onXClick={this.handleRemoveFromYourOutfit}
        />
        <Qna productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;