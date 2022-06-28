import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Widgets/Overview/Overview.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 71697 // default id to render when open the webpage
    };
  }

  render() {
    return (
      <Overview productId={this.state.productId} />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));