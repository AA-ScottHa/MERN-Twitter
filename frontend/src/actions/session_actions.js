import * as APIUtil from '../util/session_api_util.js';

// String Constants
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

// Regular Actions
const logoutUserAction = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Thunk Actions

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  APIUtil.setAuthToken(false);
  dispatch(logoutUserAction());
}