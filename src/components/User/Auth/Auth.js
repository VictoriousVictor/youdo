import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';

import { signup, login, signout, getToken, verifyToken, resetPassword, facebookLogin, googleLogin } from '../Store/Actions';
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

  onFacebookLogin = e => {
    e.preventDefault();
    this.props.facebookLogin();
  }

  onGoogleLogin = e => {
    e.preventDefault();
    this.props.googleLogin();
  }

  authenticate = () => {
    if (!this.props.user.loggedIn && !this.state.forgotPassword && this.props.location.pathname.split('/')[1] === 'login') {
      return (
        <Aux>
          {this.onErrorMessage()}
          <button className='loginBtn loginBtn--facebook' onClick={this.onFacebookLogin}>Log In With Facebook</button>
          <button className='loginBtn loginBtn--google' onClick={this.onGoogleLogin}>Log In With Google</button>
          <div className="Lines"><p>OR</p></div>
          <div>
            <input value={this.state.email} placeholder='Email' onChange={this.onChange} name='email' type='email' />
          </div>
          <div>
            <input value={this.state.password} placeholder='Password' onChange={this.onChange} name='password' type='password' />
          </div>
          <ul>
            <button 
              className='BtnBlue'
              onClick={this.onLogin} 
              onSubmit={this.onSubmit}>
              Log In
            </button>
          </ul>
          <p className='NoAcc'>You don't have an account yet? <Link to='/signup'>Sign Up</Link></p> 
          <button 
            className='ForgotBtn'
            onClick={this.onForgotPassword}>
            Forgot your password?
          </button>
        </Aux>
      )        
    } else if (!this.props.user.loggedIn && !this.state.forgotPassword && this.props.location.pathname.split('/')[1] === 'signup') {
      return (
        <Aux>
          {this.onErrorMessage()}
          <div>
            <input value={this.state.email} placeholder='Email' onChange={this.onChange} name='email' type='email' />
          </div>
          <div>
            <input value={this.state.password} placeholder='Password' onChange={this.onChange} name='password' type='password' />
          </div>
          <ul>
            <button 
              className='CreateBtn'
              onClick={this.onSignup} 
              onSubmit={this.onSubmit}>
              Create Account
            </button>
          </ul>
          <p className='NoAcc'>You have an account already? <Link to='/login'>Log In</Link></p>
        </Aux>
      ) 
    } else if (this.props.user.loggedIn) {
      return (
        <Aux>
          <p className='NoAcc'>You are logged in!</p>
          <ul>
            <button
              className='BtnBlue'
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
          <input 
            name='email'
            value={this.state.email}
            placeholder='Email'
            type='email'
            onChange={this.onChange}
            />
          <ul>
            <button className='BtnBlue' onClick={() => this.setState({forgotPassword: false})} >Back</button>
            <button className='BtnBlue' onClick={this.onForgotPasswordSubmit}>Send</button>
          </ul>
        </Aux>
      )   
    }
  }

  render() {
    return (
      <div className='Auth'>
        <form>
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
  connect(mapStateToProps, { signup, login, signout, getToken, verifyToken, resetPassword, facebookLogin, googleLogin })
)(Auth);
