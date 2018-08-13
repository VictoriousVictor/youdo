import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchAdd, fetchTodo, removeAdd } from '../../../Store/Actions'

import Add from '../Add/Add';

import './List.css'

class List extends Component {
  componentDidMount = () => {
    let uid = this.props.todo.uid
    let todo = this.props.location.pathname.split('/')[1]
      this.props.fetchTodo(uid)
      this.props.fetchAdd(uid, todo)
  }

  componentDidUpdate(prevProps, prevState) {
    let uid = this.props.todo.uid
    let todo = this.props.location.pathname.split('/')[1]
    if(this.props.todo.todos.length > 0 && prevProps.todo.todos <= 0) {
      this.props.fetchAdd(uid, todo)
    }
  }

  onRemoveAdd = (i) => {
    let todo = this.props.location.pathname.split('/')[1]
    let uid = this.props.todo.uid
    console.log(i)
    this.props.removeAdd(uid, todo, i)
  }
  
  listItems = () => {
    let todoName = this.props.location.pathname.split('/')[1]
    let nr;

    if(this.props.todo.todos) {
      for (let i = 0; i < this.props.todo.todos.length; i++) {
        nr;
        if (this.props.todo.todos[i].name === todoName) {
          nr = i;
        }
      }
    }
    

    if (!this.props.todo.todos || !this.props.todo.todos[nr] || this.props.todo.todos[nr] && this.props.todo.todos[nr].list <= 0) {
      return (
        <li>Nothing to do</li>
      )
    } else {
      let arr = [];
      this.props.todo.todos[nr].list.forEach(item => {
        arr.push(item)
      })
      return (
        arr.map(i => {
          return (
            <li key={i.key}>
              {i.name}
              <i onClick={() => this.onRemoveAdd(i.key)} className="material-icons">clear</i>
            </li>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className='AddList'>
        <h3>{this.props.location.pathname.split('/')[1]}</h3>
        <ul>
          <Add />
          {this.listItems()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo,
    user: state.user
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchAdd, fetchTodo, removeAdd })
)(List);