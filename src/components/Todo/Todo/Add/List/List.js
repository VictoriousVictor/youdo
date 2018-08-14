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
        <li className='ListItem'>Nothing to do</li>
      )
    } else {
      let arr = [];
      this.props.todo.todos[nr].list.forEach(item => {
        arr.push(item)
      })
      return (
        arr.map(i => {
          return (
            <li className='ListItem' key={i.key}>
              {i.name}
              <i onClick={() => this.onRemoveAdd(i.key)} className="material-icons">remove_circle_outline</i>
            </li>
          )
        })
      )
    }
  }

  render() {
    return (
      <div className='AddList'>
        <h2>{this.props.location.pathname.split('/')[1]}</h2>
        <Add />
        <ul>
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