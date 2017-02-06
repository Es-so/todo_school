import initApp from './app';
import config from '../../config';
import models from './models';

initApp(config, models)
  .then(app => console.log(`Music server started on ${app.url}`))
  .catch(console.error);
