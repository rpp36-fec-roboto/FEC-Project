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
      reviewsMeta: sampleData.reviewsMeta
    };
  }

  render() {
    return (
      <div>
        <Overview
          productId={this.state.productId}
          reviewsMeta={this.state.reviewsMeta}
        />
        <RelatedItems productId={this.state.productId}/>
        <Qna productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;