import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import requireAuth from '../../../utils/requireAuth';
import Aux from '../../../utils/Aux';

import { signout, deleteUser, changeEmail, changePassword, verifyToken } from '../Store/Actions'

import './Profile.css';

class Profile extends Component {
  state = {
    editEmail: false,
    editPassword: false,
    newEmail: '',
    newPassword: '',
    name: ''
  }

  componentDidMount() {
    this.props.verifyToken()
  }

  onSignout = (e) => {
    e.preventDefault();
    this.props.signout()
    this.props.history.push('/')
  }

  onDelete = e => {
    e.preventDefault();
    this.props.deleteUser();
  }

  onEditEmail = e => {
    e.preventDefault();
    this.setState({
      editEmail: true
    })
    if(this.state.editEmail) {
      this.setState({
        editEmail: false
      })
    }
  }

  onEditEmailSubmit = e => {
    e.preventDefault();
    let newEmail = this.state.newEmail
    this.props.changeEmail(newEmail)
    this.setState({
      editEmail: false,
      newEmail: ''
    })
  }

  onEditPassword = e => {
    e.preventDefault();
    this.setState({
      editPassword: true
    })
    if(this.state.editPassword) {
      this.setState({
        editPassword: false
      })
    }
  }

  onEditPasswordSubmit = e => {
    e.preventDefault();
    let newPassword = this.state.newPassword
    this.props.changePassword(newPassword)
    this.setState({
      editPassword: false,
      newPassword: '',
    })
  }

  onChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let editEmail;
      if(this.state.editEmail) {
        editEmail = (
          <li>
            <label>
              New email: 
              <input 
                name='newEmail' 
                type='email' 
                value={this.state.newEmail}
                onChange={this.onChange} />
            </label>
            <i onClick={this.onEditEmailSubmit} className="material-icons">save_alt</i>
          </li>
        )
      }

    let editPassword;
      if(this.state.editPassword) {
        editPassword = (
          <li>
            <label>
              New password: 
              <input 
                name='newPassword'
                type='password'
                value={this.state.newPassword}
                onChange={this.onChange} />
            </label>
            <i onClick={this.onEditPasswordSubmit} className="material-icons">save_alt</i>
          </li>
        )
      }

    let errorMessage;
      if(this.props.user.errorMessage) {
        errorMessage = (
          <Aux>
            <p>
              {this.props.user.errorMessage}
            </p>
          </Aux>
        )
      }

    return (
      <div className='Profile'>
        <div>
          <div>
            <p>Settings:</p>
          </div>
          {errorMessage}
          <ul>
            <li>
              <label>
                Email: {this.props.user.email}
              </label>
              <i onClick={this.onEditEmail} className="material-icons">edit</i>
            </li>
              {editEmail}
            <li>
              <label>Change password</label>
              <i onClick={this.onEditPassword} className="material-icons">edit</i>
            </li>
            {editPassword}
          </ul>
          <div>
            <button onClick={this.onSignout}>
              Signout
              <i className="material-icons">person_pin</i>
            </button>
            <button onClick={this.onDelete}>
              Delete User 
              <i className="material-icons">delete</i>
            </button>
          </div>  
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
  requireAuth,
  connect(mapStateToProps, { signout, deleteUser, changeEmail, changePassword, verifyToken })
)(Profile);