import chai from 'chai';
// import reducers from '../';
import todos from '../todos';
import { ADD_TODO, DEL_TODO, ADD_TASK, DEL_TASK } from '../../actions';

const { describe, it } = global;
const { expect } = chai;


const initialState = {
  todos: [
    {
      id: 1,
      title: 'todo1',
      mode: 1,
    },
  ],
};

describe('[UT] todo reducers', () => {
  it('should handle a ADD_TODO', () => {
    expect(
      todos([], {
        type: ADD_TODO,
        todo: {
          id: 2,
          title: 'todo1',
          mode: 1,
        },
      }),
    ).to.deep.equal([
      {
        id: 2,
        title: 'todo1',
        mode: 1,
      },
    ]);
  });
  it('should handle a DEL_TODO', () => {
    expect(
      todos({
        todos: [
        {
          id: 1,
          title: 'todo1',
          mode: 1,
        },
      ],
      }, {
        type: DEL_TODO,
        todo: [
        {
          id: 1,
          title: 'todo1',
          mode: 1,
        },
      ],
      }),
    ).to.deep.equal({});
  });
});
