const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: "https://res.cloudinary.com/dxjv0gq4k/image/upload/v1686781234/placeholder-image.png",
    set: (v) => 
        v === ""
            ? "https://res.cloudinary.com/dxjv0gq4k/image/upload/v1686781234/placeholder-image.png"
            : v
  }, 
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;