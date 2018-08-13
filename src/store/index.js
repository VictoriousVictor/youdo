import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import userReducer from '../components/User/Store/Reducer/userReducer';
import todoReducer from '../components/Todo/Store/Reducer/todoReducer';

const reducers = combineReducers({
  user: userReducer,
  todo: todoReducer
})

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)