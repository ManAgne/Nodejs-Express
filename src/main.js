const express = require('express');
const dadJokesRouter = require('./routers/dad-jokes-router');

const server = express();

//  Middleware
server.use(express.json());
server.use('/dad-jokes', dadJokesRouter);

server.listen(2566, (err) => {
  if (err) {
    console.error('Serverio paleidimo klaida');
  }

  console.log(`serveris veikia ant http://localhost:2566`);
})
