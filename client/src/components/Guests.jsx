import React from 'react';
import Category from './Category';

const { Component } = React;

export default class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Guests component</h2>
        <Category />
      </div>
    );
  }
}
