import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const fakeReducer = (state, action) => {
  switch (action.type) {
  	default:
  	  return state;
  }
};

const isFunction = arg => typeof arg === 'function';

const testMiddleware = (types = {}) => {
  const fired = {};
  return store => next => action => {
  	try {
  	  const result = next(action);
  	  const cb = types[action.type]
  	  if (cb && !fired[action.type]){
  	  	if (!isFunction(cb)) throw new Error("action's type value must be a func");
  	  	  fired[action.type] = true;
  	  	  cb(store.getState, action);
  	  }
  	  return result;
  	}catch(e) {
  	  console.log(e);
  	}
  } 
}

export const configureStore = (actions, { reducer=fakeReducer, state={} }={}) => createStore(reducer, state, applyMiddleware(testMiddleware(actions), thunk));
