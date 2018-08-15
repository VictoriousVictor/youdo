import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout, verifyToken } from '../../components/User/Store/Actions';
import { signOutClear } from '../../components/Todo/Store/Actions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Aux from '../../utils/Aux';

import './Navbar.css'

class Navbar extends Component {
  onSignout = (e) => {
    e.preventDefault();
    this.props.signout();
    this.props.signOutClear();
    this.props.history.push('/')
    this.props.verifyToken();
  }

  loggedIn = () => {
    if(this.props.user.loggedIn) {
      return (
        <Aux>
          <li>
            <i className="material-icons">sentiment_very_satisfied</i>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li onClick={this.onSignout}>
            <i className="material-icons">close</i>
          </li>
        </Aux>  
      )  
    } else {
      return (
        <Aux>
          <li>
            <NavLink to='/login'>Log In</NavLink>
          </li>
          <li>
            <NavLink to='/signup'>Sign Up</NavLink>
          </li>
        </Aux>  
      )
    }
  }

  render() {
    return (
      <nav className='Navbar' >
        <h1><Link to='/'>Youdo</Link></h1>
        <ul>
          {this.loggedIn()}
        </ul>
      </nav>
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
  connect(mapStateToProps, { signout, verifyToken, signOutClear })
)(Navbar);