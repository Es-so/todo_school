import requestJson from '../fetchAndPromise';

export const TODOS_LOADED = 'todo/todosLoaded';
export const TODO_ADDED = 'todo/todoAdded';
export const TODO_DELETED = 'todo/todoDeleted';
export const SET_MODE = 'todo/setMode';

export const TASKS_LOADED = 'task/tasksLoaded';
export const TASK_ADDED = 'task/taskAdded';
export const TASK_DELETED = 'task/taskDeleted';
export const MANAGE_TASK = 'task/manageTask';
export const UPDATE_TASK = 'task/updateTask';

export const ADD_LOADING = 'currentLoads/addLoading';
export const DEL_LOADING = 'currentLoads/delLoading';

export const ADD_ALERT = 'error/addAlert';


// ____TASKS____

const tasksLoaded = task => ({
  type: TASKS_LOADED,
  payload: task,
  mode: 1,
});

export const loadTasks = () => (dispatch) => {
  const uri = 'api/todo/tasks';
  requestJson(uri).then(tasks => dispatch(tasksLoaded(tasks)));
};

const taskAdded = task => ({
  type: TASK_ADDED,
  task,
});

const addTask = (description, listId) => (dispatch) => {
  const uri = 'api/todo/tasks';
  const body = { task: { isCompleted: false, description, listId } };
  const options = { method: 'post', body, dispatch };
  requestJson(uri, options).then(task => dispatch(taskAdded(task)));
};

const taskDeleted = id => ({
  type: TASK_DELETED,
  id,
});

const delTask = id => (dispatch) => {
  const uri = `api/todo/task/${id}`;
  const options = { method: 'DELETE', dispatch };
  return requestJson(uri, options).then(() => dispatch(taskDeleted(id)));
};

const manageTask = (id, checked) => ({
  type: MANAGE_TASK,
  id,
  checked,
});

const updateTask = (id, newTitle) => ({
  type: UPDATE_TASK,
  id,
  title: newTitle,
});

// ____TODOS____

const todosLoaded = todos => ({
  type: TODOS_LOADED,
  payload: todos,
  mode: 1,
});

export const loadTodos = () => (dispatch) => {
  const uri = 'api/todo/lists';
  requestJson(uri)
    .then(todos => dispatch(todosLoaded(todos)))
    .catch((error) => {
      if (dispatch) dispatch(addAlert(`${error.type} failed !`, state.alert.id += 1));
    });
};

export const todoAdded = todo => ({
  type: TODO_ADDED,
  todo,
});


const addTodo = title => (dispatch) => {
  const uri = 'api/todo/lists';
  const body = { todo: { label: title } };
  const options = { method: 'post', body, dispatch };
  requestJson(uri, options).then(todo => dispatch(todoAdded(todo)));
};

export const todoDeleted = id => ({
  type: TODO_DELETED,
  id,
});

const delTodo = id => (dispatch, getState) => {
  const { tasks } = getState();
  const newTask = tasks.filter(task => task.listId === id);
  const uri = `api/todo/list/${id}`;
  const options = { method: 'DELETE', dispatch };
  const tasksPromises = newTask.map(task => delTask(task.id)(dispatch));
  Promise.all([requestJson(uri, options), ...tasksPromises])
    .then(() => dispatch(todoDeleted(id)));
};

const setMode = (newMode, todoId) => ({
  type: SET_MODE,
  todoId,
  mode: newMode,
});

// ____LOADS____


export const addLoading = () => ({
  type: ADD_LOADING,
});

export const delLoading = () => ({
  type: DEL_LOADING,
});

// ____ERROR_____

const addAlert = (error, id) => ({
  type: ADD_ALERT,
  payload: { error, id },
});


export default {
  addTodo,
  delTodo,
  addTask,
  delTask,
  manageTask,
  updateTask,
  setMode,
  todoDeleted,
  addAlert,
};
