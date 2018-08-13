import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout, verifyToken } from '../../components/User/Store/Actions';
import { fetchUid } from '../../components/Todo/Store/Actions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Aux from '../../utils/Aux';

import './Navbar.css'

class Navbar extends Component {
  onSignout = (e) => {
    e.preventDefault();
    this.props.signout()
    this.props.history.push('/')
    this.props.verifyToken();
  }

  loggedIn = () => {
    if(this.props.user.loggedIn) {
      return (
        <Aux>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
            <i className='material-icons'>account_circle</i>
          </li>
          <li onClick={this.onSignout}>
            <p>Signout</p>
            <i className="material-icons">cancel</i>
          </li>
        </Aux>  
      )  
    } else {
      return (
        <li>
          <NavLink to='/auth'>Login</NavLink>
          <i className='material-icons'>account_circle</i>
        </li>
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
  connect(mapStateToProps, { signout, verifyToken })
)(Navbar);