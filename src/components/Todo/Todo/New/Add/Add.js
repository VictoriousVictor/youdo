import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import firebase from 'firebase';

import { addTodo, fetchUid, todoError, fetchAdd } from '../../../Store/Actions'
import { verifyToken } from '../../../../User/Store/Actions'
import Aux from '../../../../../utils/Aux';

import './Add.css';

class Add extends Component {
  state = {
    add: ''
  }

  componentDidMount = () => {
    this.props.verifyToken()
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.props.user.uid) {
      let uid = this.props.user.uid
      let todo = this.props.location.pathname.split('/')[1]
      this.props.fetchUid();
      this.props.fetchAdd(uid, todo)
    }
  }
  

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAdd = e => {
    e.preventDefault();
    this.props.fetchUid()
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        if(!this.props.user.uid) {
          this.props.todoError();
        } else if(this.props.user.uid) {
          let uid = this.props.user.uid;
          let add = this.state.add;
          this.props.addTodo(uid, add);
          this.props.history.push(`/${this.state.add}`)
          this.setState({
            add: ''
          })
        } 
      } else {
        this.props.todoError();
      }
    }) 
  }

  onHandleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onAdd(e)
    }
  }

  render() {
    return (
      <Aux>
        <div className='AddNew'>
          <input 
            onChange={this.onChange}
            value={this.state.add}
            onKeyPress={this.onHandleKeyPress}
            placeholder='Create a to do list'
            name='add'
            type='text' />
          <i onClick={this.onAdd} className="material-icons">add_circle</i>
        </div>
      </Aux>
      
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
  connect(mapStateToProps, { addTodo, verifyToken, fetchUid, todoError, fetchAdd })
)(Add);