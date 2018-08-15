import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { verifyToken, getToken } from '../../components/User/Store/Actions';
import { fetchTodo } from '../../components/Todo/Store/Actions'
import Aux from '../../utils/Aux'

import NewList from '../../components/Todo/Todo/New/List/List';
import AddList from '../../components/Todo/Todo/Add/List/List';

import './Home.css';

class Home extends Component {
  state = {
    sidebar: false
  }
  
  componentDidMount() {
    this.props.verifyToken()
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.user.uid && this.props.todo.todos.length === 0) {
        let uid = this.props.user.uid
        this.props.fetchTodo(uid);
      }
    }
    
  onLogin = () => {
    this.props.history.push('/login');
  }

  createNewList = () => {
    this.setState({
      sidebar: true
    })
  }


  render() {
    let start;
    if(!this.props.user.uid && !this.props.todo.uid) {
      start = (
        <div className='HomeNotLoggedIn'>
          <h2>organize yourself. Make a list.</h2>
          <h1>youdo</h1>
          <div>
            <button className='BtnBlue' onClick={this.onLogin}>Log In</button>
            <p className='NoAcc'>You don't have an account yet? <Link to='/signup'>Sign Up</Link></p> 
          </div> 
          <div className='HomeStar'></div>
        </div>
      )
    } else if(this.props.user.uid && this.props.todo.todos.length <= 0 && !this.state.sidebar) {
      start = (
        <div className='HomeLoggedInNew'>
          <h2>Welcome</h2>
          <div>
            <p>Create a to do list</p>
            <i onClick={this.createNewList} className="material-icons">add_circle_outline</i>
          </div>
        </div>
      )
    } else if(this.state.sidebar === true && this.props.todo.todos.length <= 0) {
      start = (
        <Aux>
          <div className='Sidebar'>
            <NewList />
          </div>
          <div className='HomeContent'>
            <p>Create a to do list</p>
          </div>
        </Aux>
      )
    } else if(this.props.todo.todos.length > 0) {
      start = (
        <Aux>
          <div className='Sidebar'>
            <NewList />
          </div>
          <div className='HomeContentAdd'>
            <Route path='/:id' component={AddList} />
          </div>
        </Aux>
      )
    }
    return (
      <div className='Home'> 
        {start}
        {/* <div>
          <NewList />
        </div>
        <div>
          <Route path='/:id' component={AddList} />
        </div> */}
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    todo: state.todo
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { verifyToken, getToken, fetchTodo })
)(Home);