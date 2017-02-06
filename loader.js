import fs from 'fs';
import 'universal-fetch';

const FILE = './data.csv';
const url = 'http://0.0.0.0:3004/api/v1/musics';

const makeSong = (line) => {
  const [title, genre, artist, album, time, year, rating] = line.slice(0, -1).split(',');
  return { title, genre, artist, album, time, year, rating };
}

const parserJson = result => result.json();

const loadSong = song => {
  const body = JSON.stringify(song);
  const headers = { 'Content-Type': 'application/json' };
  const options = { method: 'POST', body, headers };
  return fetch(url, options).then(parserJson);
}

const makeRequests = songs => songs.map(loadSong);

fs.readFile(FILE, 'utf-8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  const lines = data.split('\n').slice(1);
  const songs = lines.map(makeSong);
  const requests = makeRequests(songs);
  Promise.all(requests)
    .then((songs) => console.log('songs loaded: ', songs))
    .catch((err) => console.error(`Cannot load songs: ${err}`))
});
