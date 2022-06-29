import React from 'react';
import Overview from './components/Overview/Overview.jsx';
import Qna from './components/qna/qna.jsx'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 71697 // default id to render when open the webpage
    };
  }

  render() {
    return (
      <div>
        <Overview productId={this.state.productId} />
        <Qna productId={this.state.productId}/>
      </div>
    );
  }
}

export default App;