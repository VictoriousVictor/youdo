import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import NewList from '../../components/Todo/Todo/New/List/List';
import AddList from '../../components/Todo/Todo/Add/List/List';

import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className='Home'> 
        <div>
          <NewList />
        </div>
        <div>
          <Route path='/:id' component={AddList} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Home);