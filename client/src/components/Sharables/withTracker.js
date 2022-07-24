import React from 'react';
import axios from 'axios';

const withTracker = (WrappedComponent, widgetName) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.widgetName = widgetName;
    }

    sendClickTracker (event) {
      let body = {
        element: event.target.tagName.toLowerCase(),
        widget: widgetName,
        time: Date(event.timeStamp)
      };
      axios.post('/interactions', body)
        .then(() => {
          // console.log('action recorded');
        })
        .catch( err => { console.log(err); });
    }

    render() {
      return (
        <div onClick={this.sendClickTracker}>
          <WrappedComponent {...this.props} />
        </div>);
    }
  };
};

export default withTracker;