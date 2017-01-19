import {
  SET_MODE,
  TODOS_LOADED,
  TODO_ADDED,
  TODO_DELETED,
} from '../actions';

const addTodo = (state, action) => {
  const { todo } = action;
  const { id, label } = todo;
  return [
    ...state,
    { id, label, mode: 1 },
  ];
};

const delTodo = (state, action) => {
  const { id } = action;
  const newState = state.filter(todo => todo.id !== id);
  return newState;
};

const setMode = (state, action) => {
  const { todoId, mode } = action;
  const newState = state.map((todo) => {
    if (todo.id === todoId) return { ...todo, mode };
    return todo;
  });
  return [...newState];
};

const loadTodo = (state, action) => {
  const { payload } = action;
  return [...state, ...payload];
};

const todos = (state = [], action) => {
  switch (action.type) {
    case TODO_ADDED:
      return addTodo(state, action);
    case TODO_DELETED:
      return delTodo(state, action);
    case SET_MODE:
      return setMode(state, action);
    case TODOS_LOADED:
      return loadTodo(state, action);
    default:
      return state;
  }
};

export default todos;
