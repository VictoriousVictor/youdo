import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchAdd, fetchTodo, removeAdd, check } from '../../../Store/Actions'

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
  
  // listItems = () => {
  //   let todoName = this.props.location.pathname.split('/')[1]
  //   let nr;

  //   if(this.props.todo.todos) {
  //     for (let i = 0; i < this.props.todo.todos.length; i++) {
  //       if (this.props.todo.todos[i].name === todoName) {
  //         nr = i;
  //       }
  //     }
  //   }
  //   if (!this.props.todo.todos || !this.props.todo.todos[nr] || this.props.todo.todos[nr].list <= 0) {
  //     return (
  //       <li className='ListItem'>Nothing to do</li>
  //     )
  //   } else {
  //     let arr = [];
  //     this.props.todo.todos[nr].list.forEach(item => {
  //       arr.push(item)
  //     })
  //     return (
  //       arr.map(i => {
  //         return (
  //           <li className='ListItem' key={i.key}>
  //             <div>
  //               <i onClick={this.checked} class="material-icons">check_box_outline_blank</i>
  //               {i.name}
  //             </div>
  //             <i onClick={() => this.onRemoveAdd(i.key)} className="material-icons">remove_circle_outline</i>
  //           </li>
  //         )
  //       })
  //     )
  //   }
  // }

  checked = (i) => {
    let key = i.key
    let todoName = this.props.location.pathname.split('/')[1]
    let uid = this.props.user.uid
    this.props.check(key, todoName, uid)
  }

  render() {
    let todoName = this.props.location.pathname.split('/')[1]
    let nr;

    let listItems;

    if (this.props.todo.todos) {
      for (let i = 0; i < this.props.todo.todos.length; i++) {
        if (this.props.todo.todos[i].name === todoName) {
          nr = i;
        }
      }
    }

    if (!this.props.todo.todos || !this.props.todo.todos[nr] || this.props.todo.todos[nr].list <= 0) {
      listItems = (
        <li className='ListItem'>Nothing to do</li>
      )
    } else {
      let arr = [];
      this.props.todo.todos[nr].list.forEach(item => {
        arr.push(item)
      })
      listItems = (
        arr.map(i => 
          (
            <li className='ListItem' key={i.key}>
              <div>
                <i onClick={() => this.checked(i)} class="material-icons">{i.done ? 'check_box' : 'check_box_outline_blank'}</i>
                {i.name}
              </div>
              <i onClick={() => this.onRemoveAdd(i.key)} className="material-icons">remove_circle_outline</i>
            </li>
          )
        )
      )
    }

    return (
      <div className='AddList'>
        <h2>{this.props.location.pathname.split('/')[1]}</h2>
        <Add />
        <ul>
          {listItems}
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
  connect(mapStateToProps, { fetchAdd, fetchTodo, removeAdd, check })
)(List);