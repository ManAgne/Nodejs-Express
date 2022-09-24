const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const UserModel = require('../models/user-model');

const createUserNotFoundError = (userId) => createNotFoundError(`User with id '${userId}' was not found`);

const fetchAll = async (req, res) => {
  try {
    const userDocuments = await UserModel.find();

    const validationResult = await UserModel.validateUpdate({
      email: 'serbentautas@gmail.com',
      password: 'Vilnius1234!',
    });

    console.log(validationResult);

    res.status(200).json(userDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const userId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundUser = joinBy === 'categoryId'
      ? await UserModel.findById(userId).populate('categoryId')
      : await UserModel.findById(userId);
    if (foundUser === null) throw createUserNotFoundError(userId);

    res.status(200).json(foundUser);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newUserData = req.body;

  try {
    UserModel.validate(newUserData);

    const newUser = await UserModel.create(newUserData)

    res.status(201).json(newUser)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const userId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newUserData = { title, description, categoryId, img, price };

  try {
    UserModel.validate(newUserData);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      newUserData,
      { new: true, runValidators: true }
    );

    if (updatedUser === null) throw createUserNotFoundError(userId);

    res.status(200).json(updatedUser)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const userId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newUserData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    UserModel.validateUpdate(newUserData);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      newUserData,
      { new: true }
    );

    if (updatedUser === null) throw createUserNotFoundError(userId);

    res.status(200).json(updatedUser)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (deletedUser === null) createUserNotFoundError(userId);

    res.status(200).json(deletedUser);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
