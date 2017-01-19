import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const Option = Select.Option;

const Title = styled.h1`
  font-size: 1.5em;
  color: darkgrey;
  margin-bottom: 20px;
`;

const Wrapper = styled.section`
  padding: 2em;
  background: whitesmoke;
`;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const HeaderTodo = () =>
  <Wrapper>
    <Title>ToDo App</Title>
    <div>Filter Tags:
      <Select
        multiple
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
      >
        {children}
      </Select>
    </div>
  </Wrapper>
;

HeaderTodo.propTypes = {
  initialState: React.PropTypes.object.isRequired,
};

export default HeaderTodo;
