import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { signup, login, signout, getToken, verifyToken, resetPassword } from '../Store/Actions';
import Aux from '../../../utils/Aux';

import './Auth.css'

class Auth extends Component {
  state = {
    email: '',
    password: '',
    forgotPassword: false
  }

  componentDidMount() {
    this.props.verifyToken()  
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.user.token) {
      this.props.getToken();
    } 
  }
  

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.props.login(email, password);
    this.props.getToken();
    this.setState({
      email: '',
      password: ''
    })
  }

  onLogin = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.props.login(email, password)
    this.props.getToken();
    this.setState({
      email: '',
      password: ''
    })
  }

  onSignup = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.props.signup(email, password)
    this.props.getToken();
    this.setState({
      email: '',
      password: ''
    })
  }

  onSignout = e => {
    e.preventDefault();
    this.props.signout();
    this.setState({
      email: '',
      password: ''
    })
  }

  onErrorMessage = () => {
    if(this.props.user.errorMessage) {
      return (
        <p>
          {this.props.user.errorMessage}
        </p>
      )
    }
  }

  onLogged = () => {
    setTimeout(() => {
      this.props.history.push('/')
    }, 1500);
  }

  onForgotPassword = () => {
    this.setState({
      forgotPassword: true
    })
  }

  onForgotPasswordSubmit = e => {
    e.preventDefault();
    let email = this.state.email
    this.props.resetPassword(email)
    this.setState({
      email: '',
      forgotPassword: false
    })
  }

  authenticate = () => {
    if(!this.props.user.loggedIn && !this.state.forgotPassword) {
      return (
        <Aux>
          {this.onErrorMessage()}
          <div>
            <label>email:</label>
            <input value={this.state.email} onChange={this.onChange} name='email' type='email' />
          </div>
          <div>
            <label>password:</label>
            <input value={this.state.password} onChange={this.onChange} name='password' type='password' />
          </div>
          <ul>
            <button 
              onClick={this.onLogin} 
              onSubmit={this.onSubmit}>
              Login
            </button>
            <button 
              onClick={this.onSignup} 
              onSubmit={this.onSubmit}>
              Signup
            </button>
          </ul>
          <button 
            className='ForgotBtn'
            onClick={this.onForgotPassword}>
            Forgot your password?
          </button>
        </Aux>
      )        
    } else if (this.props.user.loggedIn) {
      return (
        <Aux>
          <p>You are logged in!</p>
          <ul>
            <button
              onClick={this.onSignout}
              onSubmit={this.onSubmit}>
              Signout
            </button>
          </ul>
          {this.onLogged()}
        </Aux>
      )         
    } else if(this.state.forgotPassword) {
      return (
        <Aux>
          <label>Email:</label>
          <input 
            name='email'
            value={this.state.email}
            type='email'
            onChange={this.onChange}
            />
          <ul>
            <button onClick={() => this.setState({forgotPassword: false})} >Back</button>
            <button onClick={this.onForgotPasswordSubmit}>Send</button>
          </ul>
        </Aux>
      )   
    }
  }

  render() {
    return (
      <div className='Auth'>
        <form>
          <i className='material-icons'>account_circle</i>
          {this.authenticate()}
        </form>
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
  connect(mapStateToProps, { signup, login, signout, getToken, verifyToken, resetPassword })
)(Auth);
