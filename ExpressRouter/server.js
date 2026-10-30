const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

//Parsing the cookies
//The cookies are not readable by just req.cookies, we need to use cookie-parser middleware to parse the cookies.
app.get('/parsecookies', (req, res) => {
    let { name= "anonymous" } = req.cookies;
    res.send(`Hi ${name}`);
});

//Sending cookies 
//The cookies are sent using server
//Here in this example, we are sending a cookie named 'greeting' with the value 'Hello, World!' when the user visits the '/getcookies' route.
app.get('/getcookies', (req, res) => {
    res.cookie('greeting', 'Hello, World!');
    res.send('Cookie has been set!');
})

//Signed cookies
//Signed cookies are a way to ensure the integrity of the cookie data. When a cookie is signed, it includes a signature that can be verified by the server to ensure that the cookie has not been tampered with.
//To use signed cookies, you need to provide a secret key when initializing the cookie-parser middleware. This secret key is used to sign the cookies and verify their integrity.
app.use(cookieParser('mysecretkey'));

app.get('/setsignedcookies', (req, res) => {
    res.cookie('signedGreeting', 'Hello, Signed World!', { signed: true });
    res.send('Signed cookie has been set!');
});


//Verify cookies
//to verify signed cookies, you can access the signed cookies using req.signedCookies instead of req.cookies. The cookie-parser middleware will automatically verify the signature of the signed cookies and provide you with the original value if the signature is valid.
app.get('/verifysignedcookies', (req, res) => {
    console.log(req.signedCookies);
    res.send("verified signed cookies");
});

const users = require('./Routes/user.js');
const posts = require('./Routes/post.js');

app.use('/users', users);
app.use('/posts', posts);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
