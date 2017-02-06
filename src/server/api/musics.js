import express from 'express';
import R from 'ramda';

const loadSongs = songs => (req, res) => {
  if (req.query){
  	res.json(songs.filteredSongs(req.query))
  }else res.json(songs.load());
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
