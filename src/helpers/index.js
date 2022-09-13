let currentId = 2;
const createId = () => ++currentId;

const isValidJokeData = ({ question, punchline }) =>
  question !== undefined && typeof question === 'string' && question !== '' &&
  punchline !== undefined && typeof punchline === 'string' && punchline !== '';

const createCmpById = (dadJokeIdStr) => ({ id }) => id === Number(dadJokeIdStr);

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined && value !== null) {
    prevResult[key] = value
  }

  return prevResult;
}, {})

module.exports = {
  createId,
  isValidJokeData,
  createCmpById,
  removeEmptyProps,
}