import express from 'express';

const playSong = songs => (req, res) => {
  songs.play();
  res.sendStatus(200);
};

const stopSongs = songs => (req, res) => {
  songs.stop();
  res.sendStatus(200);
};

const player = (ctx, { songs }) => {
  const router = express.Router();
  router.get('/', playSong(songs));
  router.get('/stop', stopSongs(songs));
  return router;
};

export default player;
