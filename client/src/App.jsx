import React from 'react';
import Overview from './components/Overview/Overview.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 71697 // default id to render when open the webpage
    }
  }

  render() {
    return (
      <Overview productId={this.state.productId} />
    )
  }
}

export default App;