import { RECEIVE_CURRENT_USER, RECEIVE_USER_SIGN_IN, RECEIVE_USER_LOGOUT } from '../actions/session_actions.js';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    case RECEIVE_USER_LOGOUT:
      return { isAuthenticated: false, user: undefined };
    default:
      return state;
  }
};

export default sessionReducer;