const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

//Sending cookies 
//The cookies are sent using server
//Here in this example, we are sending a cookie named 'greeting' with the value 'Hello, World!' when the user visits the '/getcookies' route.
app.get('/getcookies', (req, res) => {
    res.cookie('greeting', 'Hello, World!');
    res.send('Cookie has been set!');
})


const users = require('./Routes/user.js');
const posts = require('./Routes/post.js');

app.use('/users', users);
app.use('/posts', posts);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
