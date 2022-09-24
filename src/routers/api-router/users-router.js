const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/users-controller');

const usersRouter = Router();

usersRouter.get('/', fetchAll);

usersRouter.get('/:id', fetch);

usersRouter.post('/', create);

usersRouter.put('/:id', replace);

usersRouter.patch('/:id', update);

usersRouter.delete('/:id', remove);

module.exports = usersRouter;
