import React from 'react';
import styled from 'styled-components';
import Icon from 'antd/lib/icon';
import { message } from 'antd';

const Wrapper = styled.div`
  padding: 0px;
  margin-top: 10px;
  text-align: center;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const TextInput = styled.input`
  margin: 0px;
  margin-right: 5px;
  width: 85%;
  height: 25px;
`;

class AddTodo extends React.Component {
  state = {
    value: '',
    iconeColor: '',
    fontColor: 'black',
  }
  handleChange = event => this.setState({ value: event.target.value })
  handleClick = (value) => {
    const { addTodo } = this.props;
    if (value === '') message.error('This is a message of error');
    else {
      addTodo(value);
      this.setState({ value: '' });
    }
  }

  changeBgColor = () => {
    this.setState({ iconeColor: '#108ee9' });
    this.setState({ fontColor: 'white' });
  }
  unsetBgColor = () => {
    this.setState({ iconeColor: '' });
    this.setState({ fontColor: 'black' });
  }

  render() {
    const { value, iconeColor, fontColor } = this.state;
    return (
      <Wrapper>
        <TextInput placeholder="Add a new Todo ..." onChange={this.handleChange} value={value} />
        <Icon style={{ backgroundColor: iconeColor, color: fontColor }} onMouseOut={this.unsetBgColor} onMouseOver={this.changeBgColor} type="plus" onClick={() => this.handleClick(value)} />
      </Wrapper>
    );
  }
}

AddTodo.propTypes = {
  addTodo: React.PropTypes.func.isRequired,
};

export default AddTodo;
