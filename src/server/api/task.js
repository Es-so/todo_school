import express from 'express';
import Task from '../models/tasks'


/*
lists task: curl http://0.0.0.0:3004/api/tasks/ | json_pp
add task: curl -H "Content-Type: application/json" -X POST -d '{"task": {"isCompleted":"false", , "description": "blabla", "listId": "1"}}' http://0.0.0.0:3004/api/tasks/
delete task: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/tasks/1
*/

const loadTasks = tasks => (req, res, next) => {
  console.log('api/loadtasks: ', tasks);
  res.json(tasks.load());
}

const addTask = tasks => (req, res, next) => {
  res.json(tasks.add(req.body.task));
}

const deleteTask = tasks => (req, res, next) => {
  try {
    res.json(tasks.del(Number(req.params.id)));
  }
  catch(err) {
    next(err);
  }
}

const initTasks = (ctx, models) => {
  const app = express();
  const tasks = new Task();
  console.log("models Task: ", models);
  app.get('/', loadTasks(tasks));
  app.post('/', addTask(tasks));
  app.delete('/:id', deleteTask(tasks));
  return app;
};

export default initTasks;
