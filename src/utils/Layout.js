import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(null)
)(Layout);