import initApp from './app';
import config from '../../config';
import models from './models';

// const todos = new Todo();
// const tasks = new Task();
// const models = { todos, tasks };

initApp(config, models)
  .then(app => console.log(`Todo server started on ${app.url}`))
  .catch(console.error);
