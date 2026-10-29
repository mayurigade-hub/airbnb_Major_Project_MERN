const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

const users = require('./Routes/user');
const posts = require('./Routes/post');

app.use('/users', users);
app.use('/posts', posts);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
