import {
  TASK_ADDED,
  TASK_DELETED,
  TODO_DELETED,
  MANAGE_TASK,
  UPDATE_TASK,
  TASKS_LOADED,
} from '../actions';


const addTask = (state, action) => {
  const { task } = action;
  return [
    ...state,
    task,
  ];
};

const delTask = (state, action) => {
  const { id } = action;
  const newState = state.filter(task => task.id !== id);
  return [...newState];
};

const manageTask = (state, action) => {
  const { id, checked } = action;
  const newState = state.map((task) => {
    if (task.id === id) return { ...task, isCompleted: checked };
    return task;
  });
  return [...newState];
};

const updateTask = (state, action) => {
  const { id, title } = action;
  const newState = state.map((task) => {
    if (task.id === id) return { ...task, title };
    return task;
  });
  return [...newState];
};

const delTodoTasks = (state, action) => {
  const { id } = action;
  const newState = state.filter(task => task.listId !== id);
  return [...newState];
};

const loadTasks = (state, action) => {
  const { payload } = action;
  return [
    ...state,
    ...payload,
  ];
};

const tasks = (state = [], action) => {
  switch (action.type) {
    case TASK_ADDED:
      return addTask(state, action);
    case TASK_DELETED:
      return delTask(state, action);
    case MANAGE_TASK:
      return manageTask(state, action);
    case UPDATE_TASK:
      return updateTask(state, action);
    case TODO_DELETED:
      return delTodoTasks(state, action);
    case TASKS_LOADED:
      return loadTasks(state, action);
    default:
      return state;
  }
};

export default tasks;
