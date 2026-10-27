const express = require('express');
const app = express();
const ejs = require('ejs'); 
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

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
app.get('/listings', async (req, res) => {
    const allListing = await Listing.find({});
    res.render('listings/index.ejs', { allListing });
});

//New Route 
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Show route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
});

//Create route
app.post('/listings', async (req, res) => {
    try{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
    } catch (err) {
        next(err);
    }
});

//Edit route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
});

//update route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
});

//Delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

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

app.use((err, req, res, next) => {
    res.send("Something went wrong")
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

