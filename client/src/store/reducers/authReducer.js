import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  recoverPassword: {
    error: null,
    loading: false,
  },
  profileEdit: {
    error: null,
    loading: false,
  },
  deleteUser: {
    loading: false,
    error: null,
  },
};

// HELPER FUNCTIONS

const authStart = (state) => ({ ...state, loading: true });

const authEnd = (state) => ({ ...state, loading: false });

const authFail = (state, payload) => ({ ...state, error: payload });

const authSuccess = (state) => ({ ...state, error: false });

const verifyStart = (state) => ({
  ...state,
  verifyEmail: { ...state.verifyEmail, loading: true },
});

const verifySuccess = (state) => ({
  ...state,
  verifyEmail: { ...state.verifyEmail, loading: false, error: false },
});

const verifyFail = (state, payload) => ({
  ...state,
  verifyEmail: { ...state.verifyEmail, loading: false, error: payload },
});

const recoveryStart = (state) => ({
  ...state,
  recoverPassword: { ...state.recoverPassword, loading: true },
});

const recoverySuccess = (state) => ({
  ...state,
  recoverPassword: {
    ...state.recoverPassword,
    loading: false,
    error: false,
  },
});

const recoveryFail = (state, payload) => ({
  ...state,
  recoverPassword: {
    ...state.recoverPassword,
    loading: false,
    error: payload,
  },
});

const profileEditStart = (state) => ({
  ...state,
  profileEdit: { ...state.profileEdit, loading: true },
});

const profileEditFail = (state, payload) => ({
  ...state,
  profileEdit: { ...state.profileEdit, loading: false, error: payload },
});

const profileEditSuccess = (state) => ({
  ...state,
  profileEdit: { ...state.profileEdit, loading: false, error: false },
});

const deleteStart = (state) => ({ ...state, deleteUser: { ...state.deleteUser, loading: true } });

const deleteFail = (state, payload) => ({
  ...state,
  deleteUser: { ...state.deleteUser, loading: false, error: payload },
});

const cleanUp = (state) => ({
  ...state,
  error: null,
  loading: false,
  verifyEmail: {
    ...state.verifyEmail,
    loading: false,
    error: null,
  },
  recoverPassword: {
    ...state.recoverPassword,
    loading: false,
    error: null,
  },
  profileEdit: {
    ...state.profileEdit,
    loading: false,
    error: null,
  },
  deleteUser: {
    ...state.deleteUser,
    loading: false,
    error: null,
  },
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAN_UP:
      return cleanUp(state);

    case actions.AUTH_START:
      return authStart(state);

    case actions.AUTH_END:
      return authEnd(state);

    case actions.AUTH_FAIL:
      return authFail(state, payload);

    case actions.AUTH_SUCCESS:
      return authSuccess(state);

    case actions.VERIFY_START:
      return verifyStart(state);

    case actions.VERIFY_SUCCESS:
      return verifySuccess(state);

    case actions.VERIFY_FAIL:
      return verifyFail(state, payload);

    case actions.RECOVERY_START:
      return recoveryStart(state);

    case actions.RECOVERY_SUCCESS:
      return recoverySuccess(state);

    case actions.RECOVERY_FAIL:
      return recoveryFail(state, payload);

    case actions.PROFILE_EDIT_START:
      return profileEditStart(state);

    case actions.PROFILE_EDIT_SUCCESS:
      return profileEditSuccess(state);

    case actions.PROFILE_EDIT_FAIL:
      return profileEditFail(state, payload);

    case actions.DELETE_START:
      return deleteStart(state);

    case actions.DELETE_FAIL:
      return deleteFail(state, payload);

    default:
      return state;
  }
};
