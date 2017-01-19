import { ADD_ALERT } from '../actions';

const addAlert = (state = 0, action = {}) => {
  switch (action.type) {
    case ADD_ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default addAlert;
