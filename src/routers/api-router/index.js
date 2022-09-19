const { Router } = require('express');
const productsRouter = require('./products-router');
const categoriesRouter = require('./categories-router');

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
