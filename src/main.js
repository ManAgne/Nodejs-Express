const express = require('express');

const server = new express();

server.get('/', (req, res) => {
    res.send('Atsakymas')
})

server.get('/dad-jokes', (req, res) => {
    res.json({
        question: 'Koks megstamiausias Bethoveno vaisius?',
        punchline: 'Ba-Na-Na-Na... Ba-Na-Na-Na',
    })
})

server.listen(2566, (err) => {
    if(err){
        console.error('Serverio paleidimo klaida')
    }

    console.log('Serveris veikia ant http://localhost:2566')
})