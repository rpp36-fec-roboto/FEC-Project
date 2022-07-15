import React from 'react';

const withTracker = (WrappedComponent, widgetName) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    // method of click event handler
    trackClick (event) {
      console.log('clicked');
      // console.log(event.currentTarget.name);
      console.log(widgetName);
      console.log(event.target);
      console.log(event.timeStamp);
    }

    render() {
      return (
        <div onClick={this.trackClick}>
          <WrappedComponent {...this.props} />
        </div>);
    }
  };
};

export default withTracker;