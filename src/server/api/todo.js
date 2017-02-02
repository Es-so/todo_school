import express from 'express';

const loadTodos = model => (req, res) => {
  res.json(model.load());
};

const addTodo = model => (req, res, next) => {
  try {
    const { todo } = req.body;
    res.json(model.add(todo));
  } catch (e) {
    next(e);
  }
};

const deleteTodo = model => (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.json(model.del(id));
  } catch (e) {
    next(e);
  }
};

const initTodos = (model) => {
  const router = express.Router();
  router.get('/', loadTodos(model));
  router.post('/', addTodo(model));
  router.delete('/:id', deleteTodo(model));
  return router;
};

export default initTodos;
/*
lists todo: curl http://0.0.0.0:3004/api/todos/ | json_pp
add todo: curl -H "Content-Type: application/json" -X POST -d '{"todo": {"label":"todo40"}}' http://0.0.0.0:3004/api/todos/
delete todo: curl -H "Content-Type: application/json" -X DELETE http://0.0.0.0:3004/api/todos/1
*/
