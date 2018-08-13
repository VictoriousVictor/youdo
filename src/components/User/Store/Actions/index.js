import firebase from 'firebase';
import admin from 'firebase-admin'
import { 
  SIGNUP, 
  LOGIN, 
  SIGNOUT, 
  AUTH_ERROR, 
  DELETE_USER, 
  GET_TOKEN,
  VERIFY_TOKEN,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  GET_USER 
} from './types';

export const signup = (email, password) => async dispatch => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch({
      type: SIGNUP,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        dispatch({
          type: AUTH_ERROR,
          payload: error
        })
      })    
  } 
}

export const login = (email, password) => async dispatch => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch({
      type: LOGIN,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        dispatch({
          type: AUTH_ERROR,
          payload: error
        })
      })
  }
}

export const signout = () => dispatch => {
  firebase.auth().signOut();
  localStorage.clear('token');
  dispatch({
    type: SIGNOUT,
    payload: 'signed out'
  })
}

export const deleteUser = () => async dispatch => {
  firebase.auth().currentUser.delete().then(function() {
    localStorage.clear('token');
    dispatch({
      type: DELETE_USER,
      payload: false
    })
  }).catch(function(error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
  });
}

export const getToken = () => dispatch => {
  if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdToken( /* forceRefresh */ true)
      .then(function (idToken) {
        dispatch({
          type: GET_TOKEN,
          payload: idToken
        })
        localStorage.setItem('token', idToken);
      }).catch(function (error) {
        dispatch({
          type: AUTH_ERROR,
          payload: error
        })
      });
  } 
}

export const verifyToken = () => dispatch => {
  const idToken = localStorage.getItem('token')
  if(idToken) {
    admin.auth().verifyIdToken(idToken)
      .then(function (decodedToken) {
        dispatch({
          type: VERIFY_TOKEN,
          payload: decodedToken
        })
      }).catch(function (error) {
        localStorage.clear('token');
      });
  }
}

export const changeEmail = (newEmail) => dispatch => {
  firebase.auth().currentUser.updateEmail(newEmail)
    .then(function () {
      dispatch({
        type: CHANGE_EMAIL,
        payload: newEmail
      })
  }).catch(function (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
  });
}

export const changePassword = (newPassword) => dispatch => {
  firebase.auth().currentUser.updatePassword(newPassword).then(function () {
    dispatch({
      type: CHANGE_PASSWORD,
      payload: 'Changed password'
    })
  }).catch(function (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
  });
}

export const resetPassword = (email) => dispatch => {
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    dispatch({
      type: RESET_PASSWORD,
      payload: 'Email sent'
    })
  }).catch(function (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
  });
}

export const getUser = () => async dispatch => {
  try {
    let response = await firebase.auth().currentUser
    dispatch({
      type: GET_USER,
      payload: response
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error
    })
  } 
}