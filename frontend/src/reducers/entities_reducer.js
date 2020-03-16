import { combineReducers } from 'redux';

import usersReducer from './users_reducer.js';
import tweetsReducer from './tweets_reducer.js';

const entitiesReducer = combineReducers({
  users: usersReducer,
  tweets: tweetsReducer,
});

export default entitiesReducer;