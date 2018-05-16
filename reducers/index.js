import { combineReducers } from 'redux';

import stats from './stats';
import events from './events';
import user from './user';


const reducers = combineReducers({
  stats,
  events,
  user,
});

export default reducers;
