import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './components/store';
import { loadTodos, loadTasks } from './actions';

const initialState = {
  todos: [],
  tasks: [],
};

const store = configureStore(initialState);

store.dispatch(loadTodos());
store.dispatch(loadTasks());

window.store = store;

console.log('mounting react app ...');  // eslint-disable-line no-console
render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('__TODO__')
);
