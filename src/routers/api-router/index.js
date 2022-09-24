const { Router } = require('express');
const productsRouter = require('./products-router');
const categoriesRouter = require('./categories-router');
const usersRouter = require('./users-router');

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
