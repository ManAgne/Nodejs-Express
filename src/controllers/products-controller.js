const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors')
const ProductModel = require('../models/product-model')

const createProductNotFoundError = (productId) => createNotFoundError(`Product with id '${productId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const productDocuments = await ProductModel.find();

    res.status(200).json(productDocuments);
  } catch (err) { sendErrorResponse(err, res) }
};

const fetch = async (req, res) => {
  const productId = req.params.id;

  try {
    const foundProduct = await ProductModel.findById(productId);
    if (foundProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(foundProduct);
  } catch (err) { sendErrorResponse(err, res) }
};

const create = async (req, res) => {
  const newProductData = req.body;

  try {
    ProductModel.validate(newProductData);

    const newProduct = await ProductModel.create(newProductData)

    res.status(201).json(newProduct)

  } catch (err) { sendErrorResponse(err, res) }
};

const replace = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = { title, description, categoryId, img, price };

  try {
    ProductModel.validate(newProductData);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId, 
      newProductData, 
      { new: true, runValidators: true }
      );
    if (updatedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(updatedProduct)

  } catch (err) { sendErrorResponse(err, res) }
};

const update = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    ProductModel.validateUpdate(newProductData);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId, 
      newProductData, 
      { new: true }
      );

    if (updatedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(updatedProduct)

  } catch (err) { sendErrorResponse(err, res) }
};

const remove = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (deletedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(deletedProduct);
  } catch (err) { sendErrorResponse(err, res) }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};