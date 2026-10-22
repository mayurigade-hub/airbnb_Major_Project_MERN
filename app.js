const express = require('express');
const app = express();
const ejs = require('ejs'); 

const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

// app.get('/', (req, res) => {
//     res.send('Hi, I am root');
// });

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

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

