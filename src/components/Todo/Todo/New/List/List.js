import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchTodo, todoError, removeTodo, fetchAdd } from '../../../Store/Actions';
import { NavLink, withRouter } from 'react-router-dom';

import Add from '../Add/Add';

import './List.css';

class List extends Component {
  componentDidMount = () => {
    if(this.props.user.uid) {
      let uid = this.props.user.uid
      this.props.fetchTodo(uid)
        if (this.props.todo.todos.length > 0) {
          this.props.todo.todos.forEach(todo => this.props.fetchAdd(uid, todo.name))
        }
    } else {
      this.props.todoError();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.todo.uid && !prevProps.todos && !this.props.todo.todos.length) {
      let uid = this.props.todo.uid
      this.props.fetchTodo(uid)
      if (this.props.todo.todos.length > 0) {
        this.props.todo.todos.forEach(todo => {
          this.props.fetchAdd(uid, todo.name)
        })
      }
    }
  }

  onRemove = listItem => {
    let uid = this.props.todo.uid
    this.props.removeTodo(uid, listItem)
  }
  
  // listItems = () => {
  //   if(!this.props.todo.todos || this.props.todo.todos.length <= 0) {
  //     return (
  //       <li className='ListItem'>
  //         no todo
  //       </li>
  //     )
  //   } else if (this.props.todo.todos.length > 0) {
  //     let itemsArr = [];
  //     this.props.todo.todos.forEach(item => {
  //       if(item) {
  //         itemsArr.push(item.name)
  //       }
  //     })  
  //     return (
  //       itemsArr.map(listItem => {
  //         return (
  //           <NavLink className='LinkItem' activeClassName={'ActiveLink'} to={`/${listItem}`} key={listItem}>
  //             <div className='ItemHolder'>
  //               <li className='ListItem' key={listItem}>
  //                       {listItem}
  //               </li>
  //               <i onClick={() => this.onRemove(listItem)} className="material-icons">remove_circle_outline</i>
  //             </div>
  //           </NavLink>
  //         )
  //     })
  //   )
  //   }  
  // } 

  onChecked = (item) => {
    let y = 0;
    for (let x = 0; x < Object.entries(this.props.todo.todos).length; x++) {
      if (Object.entries(this.props.todo.todos)[x][1].name === item.name && this.props.todo.todos[0].list && this.props.todo.todos[0].list.length > 0) {
        Object.entries(this.props.todo.todos)[x][1].list.forEach(done => {
          if (!done.done) {
            y = y + 1
          }
        })
      }
    }
    return y;
  }

  render() {
    let listItem;
 
    // if(this.props.todo.todos[0].list && this.props.todo.todos[0].list.length > 0) {
    //   y = 0;
    //   for(let x = 0; x < Object.entries(this.props.todo.todos).length; x++) {
	  //     Object.entries(this.props.todo.todos)[x][1].list.forEach(done => {
    //       if(!done.done) {
    //         y = y + 1
    //       }
    //     })
    //   }
    // }

    if(!this.props.todo.todos || this.props.todo.todos.length <= 0) {
      listItem = (
        <li className='ListItem'>
          no todo
        </li>
      )
    } else if (this.props.todo.todos.length > 0) {
      let itemsArr = [];
      this.props.todo.todos.forEach(item => {
        if(item) {
          itemsArr.push(item)
        }
      })  
      listItem = (
        itemsArr.map(listItem => {
          return (
            <NavLink className='LinkItem' activeClassName={'ActiveLink'} to={`/${listItem.name}`} key={listItem.name}>
              <div className='ItemHolder'>
                <li className='ListItem' key={listItem.name}>
                    {listItem.name} 
                </li>
                <p>({this.onChecked(listItem)})</p>
                <i onClick={() => this.onRemove(listItem.name)} className="material-icons">remove_circle_outline</i>
              </div>
            </NavLink>
          )
      })
    )
    }

    return (
      <div className='NewList'>
          <Add />
        <ul>
          {listItem}
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
  connect(mapStateToProps, { fetchTodo, todoError, removeTodo, fetchAdd })
)(List);