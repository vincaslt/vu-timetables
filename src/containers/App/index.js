import React, { Component, PropTypes } from 'react';

import './styles.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app">
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
