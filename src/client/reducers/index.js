import { combineReducers } from 'redux';
import todos from './todos';
import tasks from './tasks';

const reducers = combineReducers({
  todos,
  tasks,
});

export default reducers;
