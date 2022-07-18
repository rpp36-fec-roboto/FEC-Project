import React from 'react';

const withTracker = (WrappedComponent, widgetName) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.widgetName = widgetName;
    }

    trackClick (event) {
      console.log('clicked');
      // console.log(event.currentTarget.name);
      console.log(widgetName);
      console.dir(event.target);
      console.log(Date(event.timeStamp));
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