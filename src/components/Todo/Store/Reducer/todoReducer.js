import { 
  ADD_TODO,
  TODO_ERROR,
  FETCH_UID,
  CLEAR_UID,
  FETCH_TODO,
  ADD,
  FETCH_ADD,
  REMOVE_TODO,
  REMOVE_ADD,
  SIGN_OUT_CLEAR
 } from '../Actions/types';

const initState = {
  uid: null,
  todos: [
    // {
    //   name: null,
    //   list: [
    //     {
    //       name: null,
    //       key: 'what',
    //       done: false
    //     }
    //   ]
    // }
  ],
  error: null,
  errorCode: null,
  payload: null
}

const addTodo = (state, action) => { 
  let newTodo = {};
  let updatedState = [];
  if(state.uid === action.uid) {
    if(state.todos.length <= 0) {
      newTodo = {
        name: action.add,
        list: []
      }
      updatedState = state.todos.push(newTodo)
    } else {
      state.todos.forEach(todo => {
        if (todo.name === action.add) {
          return state
        } else if(todo.name === !action.add){
          newTodo = {
            name: action.add,
            list: []
          }
        return updatedState = state.todos.push(newTodo)
        
        }
      })
    }
    return {...state, todos: [...state.todos, ...updatedState], error: null, errorCode: null}
  } 
} 

const todoError = (state, action) => {
  let updatedState = {};
  if (action.payload.message) {
    updatedState = {
      error: action.payload.message,
      errorCode: action.payload
    }
  } else {
    updatedState = {
      errorCode: action.payload
    }
  }
  return {...state, ...updatedState}
}

const fetchUid = (state, action) => {
  let updatedState = {
    uid: action.payload.uid
  }
  return { ...state, ...updatedState, error: null, errorCode: null }
}

const clearUid = (state, action) => {
  let updatedState = {
    uid: null,
    todos: []
  }
  return {...state, ...updatedState}
}

const fetchTodo = (state, action) => {
  let newTodo = {};
  let updatedState = [];
  if(!action.payload) {
    return state
  } else {
    if (Object.keys(action.payload).length > 0 && state.todos) {
      Object.keys(action.payload).forEach(todo => {
        let loopStateName = [];
        state.todos.forEach(oldTodo => {
          loopStateName.push(oldTodo.name)
        });
        if (!loopStateName.includes(todo)) {
          newTodo = {
            name: todo,
            list: []
          }
          updatedState = state.todos.push(newTodo)
        } 
      })
    } else if(state.todos) {
      let loopStateName = [];
      state.todos.forEach(oldTodo => {
        loopStateName.push(oldTodo.name)
      })
      if(!loopStateName.includes(Object.keys(action.payload))) {
        newTodo = {
          name: Object.keys(action.payload),
          list: []
        }
        updatedState = state.todos.push(newTodo)
      }
    }
  }
  return { ...state, todos: [ ...state.todos, ...updatedState ], error: null, errorCode: null }
}

const add = (state, action) => {
  let newAdd = {};
  let updatedState = [];
  let nr;
  if(action) {
    let todos = state.todos;
    for(let i=0; i<todos.length; i++ ) {
      if(todos[i].name === action.todo) {
        nr = i;
      }
    }
    let loopList = [];
    if (todos[nr] && todos[nr].list.length > 0) {
      todos[nr].list.forEach(item => {
        loopList.push(item.name)
      })
      updatedState;
      if(!loopList.includes(action.add)) {
        newAdd = {
          name: action.add,
          key: action.key,
          done: false
        }
        updatedState = state.todos[nr].list.push(newAdd)
      }
    } else if(todos[nr]) {
      newAdd = {
        name: action.add,
        key: action.key,
        done: false
      }
      updatedState = state.todos[nr].list.push(newAdd)
    }
  }
  return { ...state, todos: [ ...state.todos, ...updatedState ] }
}

const fetchAdd = (state, action) => {  
 let newAdd = {};
 let updatedState = [];
 let nr;
 if (action && state.todos.length > 0) {
   updatedState;
   let todos = state.todos;
   for (let i = 0; i < todos.length; i++) {
     if (todos[i].name === action.todo) {
       nr = i;
     }
   } 
   let arr = [];
   if(todos[nr]) {
    todos[nr].list.forEach(item => {
      arr.push(item.name)
    })
    for (let x in action.payload) {
      newAdd = {
        name: action.payload[x],
        key: x,
        done: false
      }
      if (!arr.includes(newAdd.name)) {
        todos[nr].list.push(newAdd)
      }
   }
   }
  }
 return { ...state,
   todos: [...state.todos]
 }
}

const removeTodo = (state, action) => {
  let updatedArr = state.todos.splice(action.listItem, 0)
  return {
    ...state,
    todos: [ ...updatedArr ]
  }
}

const removeAdd = (state, action) => {
  let nrTodo;
  let nrAdd
  let todos = state.todos
  for (let y = 0; y < todos.length; y++) {
    if (todos[y].name === action.todo) {
      nrTodo = y;
    }
  }
  for (let x = 0; x < todos[nrTodo].list.length; x++) {
    if(todos[nrTodo].list[x].key === action.i) {
      nrAdd = x
      // todos[nrTodo].list.splice(x, 1)
    }
  }
  todos[nrTodo].list.splice(nrAdd, 1)
  return {
    ...state,
    todos: [ ...state.todos ]
  }
}

const signOutClear = (state, aciton) => {
  let updatedState = {
    uid: null,
      todos: [
        // {
        //   name: null,
        //   list: [
        //     {
        //       name: null,
        //       key: 'what',
        //       done: false
        //     }
        //   ]
        // }
      ],
      error: null,
      errorCode: null,
      payload: null
  }
  return { ...updatedState }
}



export default function (state=initState, action) {
  switch (action.type) {
    case FETCH_UID: 
      return fetchUid(state, action)
    case ADD_TODO:
      return addTodo(state, action)
    case TODO_ERROR:
      return todoError(state, action)
    case CLEAR_UID:
      return clearUid(state, action)
    case FETCH_TODO:
      return fetchTodo(state, action)
    case ADD: 
      return add(state, action)
    case FETCH_ADD:
      return fetchAdd(state, action)
    case REMOVE_TODO:
      return removeTodo(state, action)
    case REMOVE_ADD:
      return removeAdd(state, action)
    case SIGN_OUT_CLEAR:
      return signOutClear(state, action)
    default:
      return state;
  }
}