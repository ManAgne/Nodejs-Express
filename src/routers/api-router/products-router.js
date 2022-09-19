const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/products-controller');

const productsRouter = Router();

productsRouter.get('/', fetchAll);

productsRouter.get('/:id', fetch);

productsRouter.post('/', create);

productsRouter.put('/:id', replace);

productsRouter.patch('/:id', update);

productsRouter.delete('/:id', remove);

module.exports = productsRouter;
