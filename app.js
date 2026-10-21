const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Listing = require('./models/listing');

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

app.get('/listings', async (req, res) => {
    let sampleList = await new Listing ({
        title: "Sample Listing",
        description: "This is a sample listing",
        price: 100,
        location: "Sample Location",
        country: "Sample Country"
    });
    await sampleList.save();
    res.send('Sample listing created');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})

