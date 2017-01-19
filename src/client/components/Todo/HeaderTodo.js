import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import Progress from 'antd/lib/progress';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import MyModal from '../AddTodo/modal';

const TodoHead = styled.div`
  border-bottom: 1px solid darkgrey;
  padding: 3px;
  margin-bottom: 4px;
`;

const SetMenu = ({ setMode, todo }) =>
  <Menu onClick={menuItem => setMode(parseInt(menuItem.key, 10), todo.id)}>
    <Menu.Item key="1">All</Menu.Item>
    <Menu.Item key="2">Uncomplete</Menu.Item>
    <Menu.Item key="3">Completed</Menu.Item>
  </Menu>
;

SetMenu.propTypes = {
  todo: React.PropTypes.object.isRequired,
  setMode: React.PropTypes.func.isRequired,
};

const menu = (
  <Menu>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3d menu item</Menu.Item>
  </Menu>
);

const TaskSettings = ({ tasks, todo, setMode }) =>
  <div style={{ display: 'inline', float: 'left' }} >
    { tasks.filter(task => task.todoId === todo.id).length ?
      <Dropdown.Button overlay={<SetMenu setMode={setMode} todo={todo} />} type="ghost">
        <Icon type="setting" />
      </Dropdown.Button>
    :
      <Dropdown.Button overlay={menu} type="ghost" disabled style={{ marginLeft: 8 }} >
        <Icon type="setting" />
      </Dropdown.Button>
    }
  </div>
;

TaskSettings.propTypes = {
  todo: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array.isRequired,
  setMode: React.PropTypes.func.isRequired,
};

const TodoHeader = ({ todo, tasks, todoActions, taskActions }) => {
  const state = {
    size: 'small',
  };
  const { addTask, delTask } = taskActions;
  const { delTodo, setMode } = todoActions;
  const handleDeleteC = () => {
    tasks.filter(task => task.isCompleted === true && task.todoId === todo.id)
    .map(task => delTask(task.id));
  };
  const percentCompleted = parseInt(((tasks
    .filter(task => task.isCompleted === true && task.todoId === todo.id)
    .length) * 100) / (tasks.filter(task => task.todoId === todo.id).length), 10) || 0;

  return (
    <TodoHead>
      <MyModal todo={todo} addTask={addTask} />
      <TaskSettings tasks={tasks} todo={todo} setMode={setMode} />
      <span style={{ marginLeft: '20px', marginRight: '20px' }} >
        <h2 style={{ display: 'inline' }} >
          { todo.label }
        </h2>
      </span>
      <Progress type="circle" percent={percentCompleted} width={30} />
      <Button
        type="primary"
        size="small"
        style={{ marginLeft: '5px', backgroundColor: 'red', border: 'none', float: 'right' }}
        onClick={() => delTodo(todo.id)}
      >
        x
      </Button>
      <Button
        type="primary"
        icon="delete"
        size={state.size}
        style={{ marginLeft: '10px', marginRight: '10px', marginTop: '0px', float: 'right' }}
        onClick={handleDeleteC}
      >
        Delete completed
      </Button>
    </TodoHead>
  );
};

TodoHeader.propTypes = {
  todo: React.PropTypes.object.isRequired,
  tasks: React.PropTypes.array.isRequired,
  todoActions: React.PropTypes.object.isRequired,
  taskActions: React.PropTypes.object.isRequired,
};

export default TodoHeader;
