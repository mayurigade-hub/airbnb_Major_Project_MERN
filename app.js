const express = require('express');
const app = express();
const ejs = require('ejs'); 
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const path = require('path');
const ExpressError = require('./utils/ExpressError');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const listings = require('./Routes/listing.js');
const reviews = require('./Routes/review.js');

app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);

app.all('*splat', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('listings/error.ejs', { message, statusCode });
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})
