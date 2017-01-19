import 'whatwg-fetch';
import { addLoading, delLoading } from './actions';

const checkStatus = (result) => {
  if (result.status !== 200) {
    throw new Error(result.statusText);
  }
  return result;
};
const parseJson = result => result.json();

const requestJson = (uri, { method = 'GET', body, dispatch } = {}) => {
  const absoluteUri = `http://rp3.redpelicans.com:4008/${uri}`;
  const params = { headers: { 'Content-Type': 'application/json' }, method };
  if (body) {
    params.body = JSON.stringify(body || {});
  }
  if (dispatch) dispatch(addLoading());
  return fetch(absoluteUri, params)
          .then(checkStatus)
          .then(parseJson)
          .then((result) => {
            if (dispatch) dispatch(delLoading());
            return result;
          })
          .catch((error) => {
            if (dispatch) dispatch(delLoading());
            // dispatch(addAlert(...));
            console.log(error);
          });
};

export default requestJson;
