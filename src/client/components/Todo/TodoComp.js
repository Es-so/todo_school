import React from 'react';
import styled from 'styled-components';
import Task from '../Task/ManageTask';
import TodoHeader from './HeaderTodo';

const Wrapper = styled.div`
  padding: 0px;
  background-color: none;
  margin-top: 10px;
  text-align: center;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  -webkit-flex-flow: row wrap;
  justify-content: space-around;
`;

const TodoWrap = styled.div`
  padding: 0px;
  width: auto;
  background-color: whitesmoke;
  margin-bottom: 4%;
  margin-top: 10px;
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const TodoContent = ({ todo, tasks, taskActions }) => {
  const { delTask, manageTask, updateTask } = taskActions;
  const filterTasks = (task) => {
    switch (todo.mode) {
      case 1:
        return true;
      case 2:
        return task.checked === false;
      case 3:
        return task.checked;
      default :
        return true;
    }
  };
  return (
    <div>
      {
      tasks.filter(task => task.listId === todo.id)
      .filter(filterTasks)
      .map(task =>
        <div style={{ margin: '10px' }} key={task.id}>
          <Task
            todo={todo}
            task={task}
            delTask={delTask}
            manageTask={manageTask}
            updateTask={updateTask}
          />
        </div>)
      }
    </div>);
};

TodoContent.propTypes = {
  todo: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array.isRequired,
  taskActions: React.PropTypes.object.isRequired,
};

const TodoList = ({ initialState, todoActions, taskActions }) =>
  <Wrapper>
    {initialState.todos.map(todo =>
      <TodoWrap key={todo.id}>
        <TodoHeader
          todo={todo}
          tasks={initialState.tasks}
          todoActions={todoActions}
          taskActions={taskActions}
        />

        <TodoContent
          todo={todo}
          tasks={initialState.tasks}
          taskActions={taskActions}
        />
        <br />
      </TodoWrap>)}
  </Wrapper>
;

TodoList.propTypes = {
  initialState: React.PropTypes.object.isRequired,
  todoActions: React.PropTypes.object.isRequired,
  taskActions: React.PropTypes.object.isRequired,
};

export default TodoList;
