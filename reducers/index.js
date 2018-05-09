import { combineReducers } from 'redux';

import stats from './stats';
import events from './events';

const reducers = combineReducers({
  stats,
  events
})

export default reducers;
