import { 
  LOGIN, 
  SIGNUP, 
  SIGNOUT, 
  AUTH_ERROR, 
  DELETE_USER, 
  GET_TOKEN,
  VERIFY_TOKEN,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  GET_USER
} from '../Actions/types';

const initState = {
  loggedIn: false,
  payload: null,
  uid: null,
  email: null,
  name: null,
  token: null,
  error: null,
  errorMessage: null
}

const signup = (state=initState, action) => {
  let updatedState = {
    loggedIn: true,
    payload: action.payload,
    email: action.payload.user.email,
    uid: action.payload.user.uid
  }
  return {...state, ...updatedState}
}

const login = (state=initState, action) => {
  let updatedState = {
    loggedIn: true,
    payload: action.payload,
    email: action.payload.user.email,
    uid: action.payload.user.uid
  }
  return {...state, ...updatedState}
}

const signout = (state=initState, action) => {
  let updatedState = {
    loggedIn: false,
    payload: null,
    email: null,
    name: null,
    token: null,
    uid: null,
    error: null,
    errorMessage: null
  }
  return {...state, ...updatedState}
}

const deleteUser = (state=initState, action) => {
  let updatedState = {
    loggedIn: action.payload,
    payload: null,
    email: null,
    uid: null,
    name: null,
    token: null,
    error: null,
    errorMessage: null
  }
  return {...state, ...updatedState}
}

const authError = (state=initState, action) => {
  let updatedState = {
    error: action.payload,
    errorMessage: action.payload.message
  }
  return {...state, ...updatedState}
}

const getToken = (state=initState, action) => {
  let updatedState = {
    token: action.payload
  }
  return {...state, ...updatedState}
}

const verifyToken = (state=initState, action) => {
  let updatedState = {
    loggedIn: true,
    uid: action.payload.user_id,
    email: action.payload.email
  }
  return {...state, ...updatedState}
}

const changeEmail = (state, action) => {
  let updatedState = {
    email: action.payload
  }
  return {...state, ...updatedState}
}

const getUser = (state, action) => {
  let updatedState = {
    email: action.payload.email,
    uid: action.payload.uid,
  }
  return {...state, ...updatedState}
}

export default function (state=initState, action) {
  switch (action.type) {
    case SIGNUP:
      return signup(state, action)
    case LOGIN:
      return login(state, action)
    case SIGNOUT: 
      return signout(state, action)
    case DELETE_USER:
      return deleteUser(state, action)
    case AUTH_ERROR:
      return authError(state, action)
    case GET_TOKEN:
      return getToken(state, action)
    case VERIFY_TOKEN:
      return verifyToken(state, action)
    case CHANGE_EMAIL:
      return changeEmail(state, action)
    case GET_USER:
      return getUser(state, action)
    default:
      return state
  }
}