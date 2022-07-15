import React from 'react';

const withTracker = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    // method of click event handler
    trackClick (event) {
      console.log(event.currentTarget);
      console.log(event.target);
      console.log(event.timeStamp);
    }

    render() {
      return <WrappedComponent onClick={this.trackClick} {...this.props} />;
    }
  };
};

export default withTracker;