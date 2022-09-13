const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../controllers/dad-jokes-controller');

const dadJokesRouter = Router();

/*
  type DadJoke = {
    id: number,
    question: string,
    punchline: string,
  }
  
  type DadJokeData = {
    question: string,
    punchline: string,
  }

  type PartialDadJoke = {
    question?: string,
    punchline?: string,
  }

                               Esybe grįstas API serveris - REST API 

  HTTP TYPE  | URL             | RequestData  | Response data  | Paaiškinimas
  ------------------------------------------------------------ |-----------------------------
  GET        | /dad-jokes      |     ---      | DadJoke[]      | Grąžina visų bajerių masyvą
  GET        | /dad-jokes/:id  |     ---      | DadJoke        | Grąžja bajerį pagal "id"
  POST       | /dad-jokes      | DadJokeData  | DadJoke        | Sukuria naują bajerį
  PUT        | /dad-jokes/:id  | DadJokeData  | DadJoke        | SUKEIČIA duomenis pagal "id"
  PATCH      | /dad-jokes/:id  | DadJokeData  | PartialDadJoke | Atnaujina duomenis pagal "id"
*/


dadJokesRouter.get('/', fetchAll);

dadJokesRouter.get('/:id', fetch);

dadJokesRouter.post('/', create);

dadJokesRouter.put('/:id', replace);

dadJokesRouter.patch('/:id', update);

dadJokesRouter.delete('/:id', remove);

module.exports = dadJokesRouter;