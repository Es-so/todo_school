import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import App, { Title } from '../';
import HeaderTodo from '../../Header/header';
import AddTodo from '../../AddTodo/AddTodo';
import TodoList from '../../Todo/TodoComp';

const { describe, it } = global;
const { expect } = chai;

describe('[UT] <App />', () => {
  it('should render a <Header />', () => {
    expect(shallow(<App todos={todos} actions={actions} />).find(HeaderTodo)).to.have.length(1);
  });
  it('should render a <AddTodo />', () => {
    expect(shallow(<App todos={todos} actions={actions} />).find(HeaderTodo)).to.have.length(1);
  });
  it('should render a <TodoList />', () => {
    expect(shallow(<App todos={todos} actions={actions} />).find(HeaderTodo)).to.have.length(1);
  });
});
