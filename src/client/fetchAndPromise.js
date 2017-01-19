import 'whatwg-fetch';

const checkStatus = (result) => {
  if (result.status !== 200) {
    throw new Error(result);
  }
  return result;
};

const parseJson = result => result.json();

const requestJson = (uri, { method = 'GET', body } = {}) => {
  const absoluteUri = `http://rp3.redpelicans.com:4008/${uri}`;
  const params = { headers: { 'Content-Type': 'application/json' }, method };
  if (body) {
    params.body = JSON.stringify(body || {});
  }
  return fetch(absoluteUri, params).then(parseJson);
};

export default requestJson;
