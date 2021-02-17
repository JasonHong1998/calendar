/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as actions from './actionTypes.js';

export const signUp = (data) => (dispatch, getState) => {
  dispatch({ type: actions.AUTH_START });
  axios.post('http://localhost:3000/api/auth/signup', {
    email: data.email,
    password: data.password,
  })
    .then((res) => {
      dispatch({ type: actions.AUTH_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actions.AUTH_FAIL, payload: 'The email address is already in use by another account' });
    })
    .then((res) => {
      dispatch({ type: actions.AUTH_END });
    });
};

export const signOut = () => (dispatch, getState) => {
  axios.get('http://localhost:3000/api/auth/signout', {
    withCredentials: true,
  })
    .then((res) => {
      dispatch({ type: actions.AUTH_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actions.AUTH_FAIL, payload: 'The email address is already in use by another account' });
    });
};

export const signIn = data => (dispatch, getState) => {
  dispatch({ type: actions.AUTH_START });
  axios.post('http://localhost:3000/api/auth/signin', {
    email: data.email,
    password: data.password,
  })
    .then((res) => {
      dispatch({ type: actions.AUTH_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: actions.AUTH_FAIL, payload: 'Invalid email and/or password' });
    })
    .then((res) => {
      dispatch({ type: actions.AUTH_END });
    });
};

export const clean = () => ({
  type: actions.CLEAN_UP,
});
