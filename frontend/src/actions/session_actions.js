import * as APIUtil from '../util/session_api_util.js';
import jwt_decode from 'jwt-decode';

// String Constants
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// Regular Actions
const receiveCurrentUserAction = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

const logoutUserAction = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Thunk Actions
export const signup = user => dispatch => (
  APIUtil.signup(user)
    .then(() => dispatch(receiveUserSignIn),
      err => dispatch(receiveErrors(err.response.data)))
);

export const login = user => dispatch => (
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUserAction(decoded));
    })
    .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(logoutUserAction());
};