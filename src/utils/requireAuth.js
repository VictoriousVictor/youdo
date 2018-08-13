import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { verifyToken } from '../components/User/Store/Actions'

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      if (!localStorage.getItem('token')) { 
        this.shouldNavigateAway();
      } else {
        this.props.verifyToken()
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(!this.props.user.token)
      this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      if (!this.props.user.loggedIn) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    };
  };

  const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

  return compose(
    withRouter,
    connect(mapStateToProps, { verifyToken })
  )(ComposedComponent);
};