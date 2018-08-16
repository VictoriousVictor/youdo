import firebase from 'firebase';
import { 
  ADD_TODO,
  TODO_ERROR,
  FETCH_TODO,
  FETCH_UID,
  CLEAR_UID,
  ADD,
  FETCH_ADD,
  REMOVE_TODO,
  REMOVE_ADD,
  SIGN_OUT_CLEAR,
  CHECK
} from './types'

export const addTodo = (uid, add) => async dispatch => {
  try {
    firebase.database().ref('users/' + uid).child(add).set({
      todos: ''
    });
    dispatch({
      type: ADD_TODO,
      add: add,
      uid: uid
    });
  } catch(error) {
    dispatch({
      type: TODO_ERROR,
      payload: error
    })
  } 
}

export const fetchTodo = (uid) => async dispatch => {
  try {
    await firebase.database().ref('users/' + uid).on('value', todo => 
    dispatch({
      type: FETCH_TODO,
      payload: todo.val()
    }))
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error
    })
  }
}

export const fetchUid = () => async dispatch => {
  try {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({
          type: FETCH_UID,
          payload: user
        })
      } else {
        dispatch({
          type: TODO_ERROR,
          payload: 'Not signed in'
        })
        dispatch({
          type: CLEAR_UID,
          payload: 'Clear uid'
        })
      }
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error
    })
  }
}

export const todoError = () => dispatch => {
  dispatch({
    type: TODO_ERROR,
    payload: 'Not signed in'
  })
}

export const add = (uid, todo, add) => dispatch => {
  let key = firebase.database().ref(`users/${uid}/${todo}`).child('/todos').push({
    add: add,
    done: false
  }).key
  dispatch({
    type: ADD,
    add,
    todo,
    uid,
    key: key
  })
}

export const fetchAdd = (uid, todoName) => async dispatch => {
  try {
    await firebase.database().ref('users/' + uid + '/' + todoName).child('/todos').on('value', todo =>
      dispatch({
        type: FETCH_ADD,
        payload: todo.val(),
        uid: uid,
        todo: todoName
      }))
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: error
    })
  }
}

export const removeTodo = (uid, listItem) => async dispatch => {
  firebase.database().ref('users/' + uid + '/' + listItem).remove()
  dispatch({
    type: REMOVE_TODO,
    payload: 'Remove todo',
    uid: uid,
    listItem: listItem
  })
}

export const removeAdd = (uid, todo, i) => async dispatch => {
  firebase.database().ref('users/' + uid + '/' + todo + '/todos/').child(i).remove()
  dispatch({
    type: REMOVE_ADD,
    payload: 'Remove Add',
    uid: uid,
    todo: todo,
    i: i
  })
}

export const signOutClear = () => async dispatch => {
  dispatch({
    type: SIGN_OUT_CLEAR,
    payload: 'Sign Out'
  })
}

export const check = (key, todoName, uid) => async dispatch => {
  let obj;
  firebase.database().ref('users/' + uid + '/' + todoName + '/todos' + '/')
    .child(key)
    .once('value',
      todo => {
        obj = todo.val()
      }
    )
    if(obj.done === true) {
      firebase.database().ref('users/' + uid + '/' + todoName + '/todos' + '/').child(key).update({
        done: false
      })
    } else if (obj.done === false) {
      firebase.database().ref('users/' + uid + '/' + todoName + '/todos' + '/').child(key).update({
        done: true
      })
    }

  dispatch({
    type: CHECK,
    key: key,
    todoName: todoName
  })
}