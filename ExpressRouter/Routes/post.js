const express = require('express');
const router = express.Router();


//POST
//Index 
app.get('/posts', (req, res) => {
    res.send('GET for users');
});

//Show 
app.get('/posts/:id', (req, res) => {
    res.send('GET for users id');
});

//POST
app.post('/posts', (req, res) => {
    res.send('POST for users');
});

//DELETE 
app.delete('/posts/:id', (req, res) => {
    res.send('DELETE for users id');
});