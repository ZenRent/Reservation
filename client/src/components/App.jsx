import React from 'react';
import Dates from './Dates';
import Guests from './Guests';

const { Component } = React;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>ZenRent Reservation App</h1>
        <Dates />
        <Guests />
      </div>
    );
  }
}

export default App;
