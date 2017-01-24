import should from 'should';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import { configureStore } from './utils';
import rootReducer from '../../reducers';
import {
  loadTodos,
  loadTasks,
  addTodo,
  TODOS_LOADED,
  TASKS_LOADED,
  TASK_ADDED,
  TODO_ADDED,
} from '../';

const { describe, it, before, after } = global;

describe.only('[UT] todos actions', () => {
  afterEach(function(){
    fetchMock.restore();
  });
  it('Should load todos with fake store', function (done) {
    const data = [{hello: 'world'}];
    fetchMock.get('http://rp3.redpelicans.com:4008/api/todo/lists', data);
    const actions = {
      [TODOS_LOADED]: (getState, action) => {
        const state = getState();
        const { payload } = action;
        should(payload).deepEqual(data);
        console.log("action middleWare: ", action);
        done();
      },
    };
    const store = configureStore(actions);
    store.dispatch(loadTodos());
  });

  it('Should load todos with real store', (done) => {
    const todo = { id: 201, label: 'test' };
    const todos = [todo];
    const cb = sinon.spy();
    const url = 'http://rp3.redpelicans.com:4008/api/todo/lists';
    fetchMock.get(url, todos);
    const actions = {
      [TODO_ADDED]: cb,
      [TODOS_LOADED]: (getState, action) => {
        const { payload } = action;
        should(cb.calledOnce);
        should(payload).deepEqual(todos);
        should(getState().todos[0].id).deepEqual(todo.id);
        done();
      },
    };
    const store = configureStore(actions, { reducer: rootReducer });
    store.dispatch(loadTodos());
  });
  
  it('Should load tasks with fake store', (done) => {
    const data = [{ id: 179, label: 'test' }];
    const url = 'http://rp3.redpelicans.com:4008/api/todo/tasks';
    fetchMock.get(url, data);
    const actions = {
      [TASKS_LOADED]: (getState, action) => {
        const { payload } = action;
        should(payload).deepEqual(data);
        done();
      },
    };
    const store = configureStore(actions);
    store.dispatch(loadTasks());
  });

  it('Should load tasks with real store', (done) => {
    const task = { id: 179, label: 'test' };
    const tasks = [task];
    const cb = sinon.spy();
    const url = 'http://rp3.redpelicans.com:4008/api/todo/tasks';
    fetchMock.get(url, tasks);
    const actions = {
      [TASK_ADDED]: cb,
      [TASKS_LOADED]: (getState, action) => {
        const { payload } = action;
        should(cb.calledOnce);
        should(payload).deepEqual(tasks);
        should(getState().tasks[0].id).deepEqual(task.id);
        done();
      },
    };
    const store = configureStore(actions, { reducer: rootReducer });
    store.dispatch(loadTasks());
  });

  it('Should add todo with fake store', (done) => {
    const data = [{ id: 202, label: 'test' }];
    const url = 'http://rp3.redpelicans.com:4008/api/todo/lists';
    fetchMock.post(url, data);
    const actions = {
      [TODO_ADDED]: (getState, action) => {
        const { todo } = action;
        should(todo).deepEqual(data);
        done();
      },
    };
    const store = configureStore(actions);
    store.dispatch(addTodo());
  });

  it('Should add todo with real store', (done) => {
    const todo_ = { id: 202, label: 'test' };
    const todos = [todo_];
    const url = 'http://rp3.redpelicans.com:4008/api/todo/lists';
    fetchMock.post(url, todos);
    const actions = {
      [TODO_ADDED]: (getState, action) => {
        const { todo } = action;
        should(todo).deepEqual(todos);
        should(getState().todos[0].id).deepEqual(todo.id);
        done();
      },
    };
    const store = configureStore(actions, { reducer: rootReducer });
    store.dispatch(addTodo());
  });

});