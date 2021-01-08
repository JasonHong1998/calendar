import axios from 'axios';
import * as actions from './actionTypes';

const ROOT_URL = 'http://localhost:3000/api/todos';

// Sign up action creator
export const signUp = data => async (dispatch, getState) => {
  dispatch({ type: actions.AUTH_START });
  try {
    await firestore
      .collection('users')
      .doc(res.user.uid)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

// Logout action creator
export const signOut = () => async (dispatch, getState) => {
  try {
  } catch (err) {
    console.log(err.message);
  }
};

// Login action creator
export const signIn = data => async (dispatch, getState) => {
  dispatch({ type: actions.AUTH_START });
  try {
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

// Clean up messages
export const clean = () => ({
  type: actions.CLEAN_UP,
});

// Verify email actionTypes
export const verifyEmail = () => async (dispatch, getState) => {
  dispatch({ type: actions.VERIFY_START });
  try {
    dispatch({ type: actions.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
  }
};

// Send recover password
export const recoverPassword = data => async (
  dispatch,
  getState,
) => {
  dispatch({ type: actions.RECOVERY_START });
  try {
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
  }
};

// Edit profile
export const editProfile = data => async (
  dispatch,
  getState,
) => {
  dispatch({ type: actions.PROFILE_EDIT_START });
  try {
    //edit the user profile
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};

// Delete user
export const deleteUser = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_START });
  try {
    await firestore
      .collection('users')
      .doc(userId)
      .delete();

    await firestore
      .collection('todos')
      .doc(userId)
      .delete();

    await user.delete();
  } catch (err) {
    dispatch({ type: actions.DELETE_FAIL, payload: err.message });
  }
};