import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../Header/header';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../Todo/TodoComp';
import allTheActions from '../../actions';

const App = ({ todos, tasks, actions }) => {
  const initialState = { todos, tasks };
  const { delTodo, setMode, addTask, delTask, manageTask, updateTask } = actions;
  const todoActions = { delTodo, setMode };
  const taskActions = {
    addTask,
    delTask,
    manageTask,
    updateTask,
  };
  return (
    <div>
      <Header initialState={initialState} />
      <AddTodo addTodo={actions.addTodo} />
      <TodoList
        initialState={initialState}
        taskActions={taskActions}
        todoActions={todoActions}
      />
    </div>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allTheActions, dispatch),
});

App.propTypes = {
  todos: React.PropTypes.array.isRequired,
  tasks: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
