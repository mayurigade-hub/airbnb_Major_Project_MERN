const express = require('express');
const app = express();
const ejs = require('ejs'); 
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const wrapAsync = require('./utils/wrapAsync');
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

//Index Route
app.get('/listings', wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render('listings/index.ejs', { allListing });
}));

//New Route 
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Show route
app.get('/listings/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
}));

//Create route
app.post('/listings', wrapAsync(async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, 'Bad Request');
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));

//Edit route
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
}));

//update route
app.put('/listings/:id', wrapAsync(async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, 'Bad Request');
    }
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
}));

//Delete route
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

// app.get('/listings', async (req, res) => {
//     let sampleList = await new Listing ({
//         title: "Sample Listing",
//         description: "This is a sample listing",
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     });
//     await sampleList.save();
//     res.send('Sample listing created');
// });

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('listings/error.ejs', { message, statusCode });
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

