const { removeEmptyProps } = require('../helpers');
const { createBadDataError, createNotFoundError, sendErrorResponse } = require('../helpers/errors/index')
const ProductModel = require('../models/product-model')

const isValidProduct = ({ title, description, categoryId, price, img }) =>
  title !== undefined && typeof title === 'string' && title !== '' &&
  description !== undefined && typeof description === 'string' && description !== '' &&
  categoryId !== undefined && typeof categoryId === 'string' && categoryId !== '' &&
  price !== undefined && typeof price === 'number' && price > 0 &&
  img !== undefined && typeof img === 'string' && img !== '';

const createProductNotFoundError = (productId) => createBadDataError(`Product with id '${productId}' was not found`);
const createProductBadDataError = (dataObj) => createNotFoundError(`Product data is invalid:\n${JSON.stringify(dataObj, null, 4)}`);

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
    if (!isValidProduct(newProductData)) throw createProductBadDataError(newProductData);

    const newProduct = await ProductModel.create(newProductData)

    res.status(201).json(newProduct)

  } catch (err) { sendErrorResponse(err, res) }
};

const replace = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = { title, description, categoryId, img, price };

  try {
    if (!isValidProduct(newProductData)) throw createProductBadDataError(newProductData);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId, 
      newProductData, 
      { new: true, runValidators: true }
      );
    if (updatedProduct === null) throw createProductNotFoundError(productId);

    res.status(200).json(updatedProduct)

  } catch (error) {
    const { status, message } = error;

    if(status && message){
      res.status(status).json({ message });
    } else {
      res.status(400).json({ message: error.message })
    }
  }
};

const update = async (req, res) => {
  const productId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newProductData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
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