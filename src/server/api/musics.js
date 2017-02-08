import express from 'express';

const loadSongs = songs => (req, res) => {
  res.json(songs.load(req.query));
};

const addSong = songs => (req, res, next) => {
  try {
    const song = req.body;
    res.json(songs.add(song));
  } catch (e) {
    next(e);
  }
}

const initMusics = (ctx, { songs }) => {
  const router = express.Router();
  router.get('/', loadSongs(songs));
  router.post('/', addSong(songs));
  return router;
};

export default initMusics;
