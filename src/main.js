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

let currentId = 2;
createId = () => ++currentId;

const isValidJokeData = ({ question, punchline }) => (
    question !== undefined && typeof question === 'string' && question !== '' &&
    punchline !== undefined && typeof punchline === 'string' && punchline !== '')

const createCmpbyId = (dadJokeIdStr) => ({ id }) => id === Number(dadJokeIdStr);

const findDadJoke = (dadJokeIdStr) => database.dadJokes.find(createCmpbyId(dadJokeIdStr));

server.get('/', (req, res) => {
    res.send('Atsakymas')
})

// GET        | /dad-jokes      
server.get('/dad-jokes', (req, res) => {
  res.status(200).json(database.dadJokes);
})

// GET        | /dad-jokes/:id 

server.get('/dad-jokes/:id', (req, res) => {
    const dadJokeID = req.params.id;

    try {
        const dadJoke = findDadJoke(dadJokeID);
        if(dadJoke === undefined) throw ({
            message: 'Serveris nepagavo bajerio',
            status: 404
        });

    res.status(200).json(dadJoke)
    } catch ({ status, message }) {
        res.status(status).json({ message })
    }
})

// POST       | /dad-jokes    

server.post('/dad-jokes', (req, res) => {
    const newDadJokeData = req.body;

    try {
        if (!isValidJokeData(newDadJokeData)) throw ({ 
            message: 'Prastas humoro jausmas ', 
            status: 400 
        });

        const newDadJoke = {
            id: createId(),
            ...newDadJokeData
        }

        database.dadJokes.push(newDadJoke)
        
        res.status(201).json(newDadJoke)

    } catch ({ status, message }) {
        res.status(status).json({ message })
    }
})

// PUT        | /dad-jokes/:id  

server.put('/dad-jokes/:id', (req, res) => {
    const dadJokeID = req.params.id;
    const newDadJokeData = req.body;
    
    try {
        if (!isValidJokeData(newDadJokeData)) throw ({ 
            message: 'Prastas humoro jausmas ', 
            status: 400 
        });

        const foundDadJokeIndex = database.dadJokes.findIndex(createCmpbyId(dadJokeID));

        if (foundDadJokeIndex === -1) throw ({ 
            message: 'Serveris nepagavo bajerio', 
            status: 404 
        });

        const updatedDadJoke = {
            id: database.dadJokes[foundDadJokeIndex],
            ...newDadJokeData
        }

        database.dadJokes[foundDadJokeIndex] = updatedDadJoke;
    
        res.status(200).json(foundDadJoke)

    } catch ({ status, message }) {
        res.status(status).json(message)
    }
});

// PATCH      | /dad-jokes/:id

server.patch('/dad-jokes/:id', (req, res) => {
    const dadJokeID = req.params.id;
    const newDadJokeData = req.body;
    
    try {
        if (!isValidJokeData(newDadJokeData)) throw ({ 
            message: 'Prastas humoro jausmas ', 
            status: 400 
        });

        const foundDadJoke = findDadJoke(dadJokeID);

        if (foundDadJoke === undefined) throw ({ 
            message: 'Serveris nepagavo bajerio', 
            status: 404 
        });

        foundDadJoke.punchline = newDadJokeData.punchline;
        foundDadJoke.question = newDadJokeData.question;
    
        res.status(200).json(foundDadJoke)

    } catch ({ status, message }) {
        res.status(status).json(message)
    }
});

// DELETE     | /dad-jokes/:id 

server.listen(2566, (err) => {
    if(err){
        console.error('Serverio paleidimo klaida')
    }

    console.log('Serveris veikia ant http://localhost:2566')
})