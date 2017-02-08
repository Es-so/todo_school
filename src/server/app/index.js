import express from 'express';
import http from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { error } from './middleware';
import initApi from '../api';

const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;

const initApp = (config = {}, models) => {
  const { server } = config;
  const app = express();
  const httpServer = http.createServer(app);
  const promise = new Promise((resolve) => {
    app
      .use(compression())
      .use(bodyParser.json())
      .use(morgan('dev'))
      .use('/ping', (req, res) => res.json({ ping: 'pong' }))
      .use('/api/v1', initApi(app, models))
      .use((req, res) => {
        res.redirect('/public/index.html');
      })
      .use(error);

    httpServer.listen(server.port, server.host, () => {
      app.config = config;
      app.url = getUrl(httpServer);
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
