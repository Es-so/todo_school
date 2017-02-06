import R from 'ramda'
import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { error } from './middleware';
import fs from 'fs'
import initApi from '../api';


const getUrl = (server) => `http://${server.address().address}:${server.address().port}`;

const test = () => {
  fs.readFile(path.join(__dirname, '../data.csv'), 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const rest = data.split('\n');
    console.log(data);
    return res.send(rest);
  });
}

const initApp = (config = {}, models) => {
  const { publicPath, buildPath, server } = config;
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
