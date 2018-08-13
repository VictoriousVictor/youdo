import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';

import '../styles/Layout.css'

class Layout extends Component {
  render() {
    return (
      <div className='Layout'>
        <Navbar />
        <main className='Main'>
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