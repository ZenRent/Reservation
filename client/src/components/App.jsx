import React from 'react';
import Dates from './Dates';
import Guests from './Guests';
import Costs from './Costs';

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
        <Costs />
      </div>
    );
  }
}

export default App;
