const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { listingSchema, reviewSchema } = require('../schema.js');
const Listing = require('../models/listing');

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(errMsg, 400);
    } else {
    next();
    }
}

//Index Route
router.get('/', wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render('listings/index.ejs', { allListing });
}));

//New Route 
router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Show route
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs', { listing });
}));

//Create route
router.post('/',
    validateListing,
    wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));

//Edit route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
}));

//update route
router.put('/:id', 
    validateListing,
    wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
}));

//Delete route
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));

router.get('/', (req, res) => {
    res.send('Hi, I am root');
});

module.exports = router;