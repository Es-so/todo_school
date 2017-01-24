import fetchMock from 'fetch-mock';

const data = { hello: 'world' };
const url = 'http://rp3.redpelicans.com:4008/api/todo/lists';
const parseJson = result => result.json();

fetchMock.get(url, data);

fetch(url).then(parseJson).then(console.log);