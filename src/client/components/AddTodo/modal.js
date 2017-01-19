import React from 'react';
import styled from 'styled-components';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';

const Wrapper = styled.div`
  padding: 0px;
  float: left;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
`;

const TextInput = styled.input`
  margin: 0px;
  margin-right: 5px;
  width: 85%;
  height: 25px;
`;

class MyModal extends React.Component {
  state = {
    value: '',
    visible: false,
  }

  handleChange = event => this.setState({ value: event.target.value })

  handleClick = () => {
    this.setState({ value: '' });
  }

  showModal = () => this.setState({ visible: true })

  handleOk = () => this.setState({ visible: false })

  handleCancel = () => this.setState({ visible: false })

  validateTask = (todoId, value) => {
    const { addTask } = this.props;
    if (value !== '') {
      addTask(value, todoId);
      this.handleClick(value);
      this.handleCancel();
    }
  }

  render() {
    const { todo } = this.props;
    const { value } = this.state;
    return (
      <Wrapper>
        <Button
          type="primary"
          size="small"
          style={{ marginRight: '5px', border: 'none' }}
          onClick={this.showModal}
        >
          +
        </Button>
        <Modal
          title="Add Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[<button
                     key="ValidButton"
                     onClick={() => this.validateTask(todo.id, value)}
                   >
                    +
                   </button>]} 
          >
          <TextInput
            placeholder="Add new task ..."
            onChange={this.handleChange}
            value={value}
          />
        </Modal>
      </Wrapper>
    );
  }
}

MyModal.propTypes = {
  todo: React.PropTypes.object.isRequired,
  addTask: React.PropTypes.func.isRequired,
};


export default MyModal;


// import { Spin, Alert, Switch } from 'antd';

// const Card = React.createClass({
//   getInitialState() {
//     return { loading: false };
//   },
//   toggle(value) {
//     this.setState({ loading: value });
//   },
//   render() {
//     const container = (
//       <Alert
//         message="Alert message title"
//         description="Further details about the context of this alert."
//         type="info"
//       />
//     );
//     return (
//       <div>
//         <Spin spinning={this.state.loading} delay={500} >{container}</Spin>
//         Loading state：<Switch checked={this.state.loading} onChange={this.toggle} />
//       </div>
//     );
//   },
// });

// ReactDOM.render(
//   <Card />
// , mountNode);