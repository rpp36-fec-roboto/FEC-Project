import React from 'react';

const withTracker = (WrappedComponent, widgetName) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.widgetName = widgetName;
    }

    sendClickTracker (event) {
      console.log('clicked');
      console.log(widgetName);
      console.dir(event.target.tagName.toLowerCase());
      console.log(Date(event.timeStamp));
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