import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import LoadingSpinner from './LoadingSpinner';
class App extends Component {
  constructor(props) {
    // init the parent
    super(props); 
    // set state
    // ONLY TIME WE USE DIRECT ASSIGNMENT
    // must be literally named state 
    this.state = {
      lat: null,
      long: null,
      errorMessage: ''
    };
  }

  componentDidMount() {
    // get location
    window.navigator.geolocation.getCurrentPosition(
      // CB 1 man callbacks suck
      (position) => {
        // use setState to update any state
        // ONLY
        this.setState({
          lat: position.coords.latitude
        });
      },
      // cb 2
      (error) => {
        // set state if error
        this.setState({
          errorMessage: error.message
        });
      }
    );
  }

  renderContent() {
    const { lat, errorMessage } = this.state;
    if (errorMessage && !lat) {
      return (<div>Error: {errorMessage}</div>);
    } else if (!errorMessage && lat) {
      return (<SeasonDisplay lat={lat} />);
    } else {
      return ( 
        <LoadingSpinner 
          message="Can we know where you're at?
          Waiting for location request ..."
        /> 
      );
    }
  }

  render() {
    return (
      <div className="no conditionals in render11">
        {this.renderContent()}
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
)