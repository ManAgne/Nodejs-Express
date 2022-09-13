const {
  createId,
  isValidJokeData,
  createCmpById,
  removeEmptyProps
} = require('../helpers');

const database = {
  dadJokes: [{
    id: 1,
    question: 'Koks megstamiausias Bethoveno vaisius?',
    punchline: 'Ba-Na-Na-NA... Ba-na-na-na',
  }, {
    id: 2,
    question: 'Kokioje šalyje daugiausiai veganų?',
    punchline: 'cu-Kinijoj',
  }]
};

const fetchAll = (req, res) => {
  res.status(200).json(database.dadJokes);
};

const fetch = (req, res) => {
  const dadJokeId = req.params.id;

  try {
    const foundDadJoke = database.dadJokes.find(createCmpById(dadJokeId));
    if (foundDadJoke === undefined) throw ({
      message: 'Serveris nepagavo bajerio',
      status: 404
    });

    res.status(200).json(foundDadJoke);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = (req, res) => {
  const newDadJokeData = req.body;

  try {
    if (!isValidJokeData(newDadJokeData)) throw ({
      message: 'Prastas humoro jausmas',
      status: 400
    });

    const newDadJoke = {
      id: createId(),
      ...newDadJokeData,
    };

    database.dadJokes.push(newDadJoke)

    res.status(201).json(newDadJoke)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const replace = (req, res) => {
  const dadJokeId = req.params.id;
  const { question, punchline } = req.body;
  const newDadJokeData = { question, punchline };

  try {
    if (!isValidJokeData(newDadJokeData)) throw ({
      message: 'Prastas humoro jausmas',
      status: 400
    });

    const foundDadJokeIndex = database.dadJokes.findIndex(createCmpById(dadJokeId));
    if (foundDadJokeIndex === -1) throw ({
      message: 'Serveris nepagavo bajerio',
      status: 404
    });
    const updatedDataJoke = {
      id: database.dadJokes[foundDadJokeIndex].id,
      ...newDadJokeData
    }

    database.dadJokes[foundDadJokeIndex] = updatedDataJoke;

    res.status(200).json(updatedDataJoke)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const update = (req, res) => {
  const dadJokeId = req.params.id;
  const { question, punchline } = req.body;
  const newDadJokeData = removeEmptyProps({ question, punchline });

  try {

    const foundDadJokeIndex = database.dadJokes.findIndex(createCmpById(dadJokeId));
    if (foundDadJokeIndex === -1) throw ({
      message: 'Serveris nepagavo bajerio',
      status: 404
    });

    const updatedDataJoke = {
      ...database.dadJokes[foundDadJokeIndex],
      ...newDadJokeData,
    }

    database.dadJokes[foundDadJokeIndex] = updatedDataJoke;

    res.status(200).json(updatedDataJoke)

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const dadJokeId = req.params.id;

  try {
    const foundDadJokeIndex = database.dadJokes.findIndex(createCmpById(dadJokeId));
    if (foundDadJokeIndex === -1) throw ({
      message: 'Serveris nepagavo bajerio',
      status: 404
    });

    const [deletedDadJoke] = database.dadJokes.splice(foundDadJokeIndex, 1);

    res.status(200).json(deletedDadJoke);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};