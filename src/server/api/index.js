import express from 'express';
import initMusics from './musics';
import player from './player';

const init = (ctx, models) => {
  const app = express();

  app.use('/musics', initMusics(ctx, models));
  app.use('/musics/play', player(ctx, models));
  return app;
};

export default init;
