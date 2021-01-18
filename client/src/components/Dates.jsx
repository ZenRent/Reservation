import React from 'react';
import Calendar from './Calendar';

const { Component } = React;

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Dates component</h2>
        <Calendar />
      </div>
    );
  }
}

export default Dates;
