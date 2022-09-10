const express = require('express');

const server = express();

// Middleware
server.use(express.json());

const database = {
    dadJokes: [{
        id: 1,
        question: 'Koks megstamiausias Bethoveno vaisius?',
        punchline: 'Ba-Na-Na-Na... Ba-Na-Na-Na',
    }, {
        id: 2,
        question: 'Kokioje šalyje daugiausiai veganų?',
        punchline: 'cu-Kinijoje',
    }]
};

const isValidJokeData = ({ question, punchline }) => (
    question !== undefined && typeof question === 'string' && question !== '' &&
    punchline !== undefined && typeof punchline === 'string' && punchline !== '')

server.get('/', (req, res) => {
    res.send('Atsakymas')
})

// GET        | /dad-jokes      
server.get('/dad-jokes', (req, res) => {
  res.status(400).json(database.dadJokes);
})

// GET        | /dad-jokes/:id 

server.get('/dad-jokes/:id', (req, res) => {
    const dadJokeID = req.params.id;
    res.status(400).json(database.dadJokes.find(x => x.id === Number(dadJokeID)));
})

// POST       | /dad-jokes      

// PUT        | /dad-jokes/:id  

// PATCH      | /dad-jokes/:id

server.patch('/dad-jokes/:id', (req, res) => {
    const dadJokeID = req.params.id;
    const newDadJokeData = req.body;
    
    try {
        if (!isValidJokeData(newDadJokeData)) throw ({ 
            message: 'Prastas humoro jausmas ', 
            status: 400 
        });
        const existingDadJoke = database.dadJokes.find(x => x.id === Number(dadJokeID))

        if (existingDadJoke === undefined) throw ({ 
            message: 'Serveris nepagavo bajerio', 
            status: 404 
        })

        existingDadJoke.punchline = newDadJokeData.punchline;
        existingDadJoke.question = newDadJokeData.question;
    
        res.status(200).json(existingDadJoke)

    } catch ({ status, message }) {
        res.status(status).json(message)

        return;
    }

})

// DELETE     | /dad-jokes/:id 

server.listen(2566, (err) => {
    if(err){
        console.error('Serverio paleidimo klaida')
    }

    console.log('Serveris veikia ant http://localhost:2566')
})