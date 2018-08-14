import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchTodo, todoError, removeTodo } from '../../../Store/Actions';
import { Link, withRouter } from 'react-router-dom';

import Add from '../Add/Add';

import './List.css';

class List extends Component {
  componentDidMount = () => {
    if(this.props.user.uid) {
      let uid = this.props.todo.uid
      this.props.fetchTodo(uid)
    } else {
      this.props.todoError();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.todo.uid && !prevProps.todos && !this.props.todo.todos.length) {
      let uid = this.props.todo.uid
      this.props.fetchTodo(uid)
    }
    console.log(prevProps, this.props)
  }

  onRemove = listItem => {
    let uid = this.props.todo.uid
    console.log(listItem)
    this.props.removeTodo(uid, listItem)
  }
  
  listItems = () => {
    if(!this.props.todo.todos || this.props.todo.todos.length <= 0) {
      return (
        <li className='ListItem'>
          no todo
        </li>
      )
    } else if (this.props.todo.todos.length > 0) {
      let itemsArr = [];
      this.props.todo.todos.forEach(item => {
        if(item) {
          itemsArr.push(item.name)
        }
      })  
      return (
        itemsArr.map(listItem => {
          return (
            <li className='ListItem' key={listItem}>
              <Link to={`/${listItem}`}>
                    {listItem}
              </Link>
              <i onClick={() => this.onRemove(listItem)} className="material-icons">remove_circle_outline</i>
            </li>
          )
      })
    )
    }  
  }

  render() {
    return (
      <div className='NewList'>
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
    user: state.user,
    todo: state.todo
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchTodo, todoError, removeTodo })
)(List);