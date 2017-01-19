import { combineReducers } from 'redux';
import todos from './todos';
import tasks from './tasks';
import currentLoads from './loads';
import alert from './alert';

const reducers = combineReducers({
  todos,
  tasks,
  currentLoads,
  alert,
});

export default reducers;
