import { combineReducers } from 'redux';

import sessionReducer from './session_reducer.js';
import entitiesReducer from './entities_reducer.js';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
});

export default rootReducer;