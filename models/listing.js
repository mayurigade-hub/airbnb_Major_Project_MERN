const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://tse4.mm.bing.net/th/id/OIP.tT7UG7QNOQKvijhtgqq2lAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      set: (v) => 
        v === ""
        ? "https://tse4.mm.bing.net/th/id/OIP.tT7UG7QNOQKvijhtgqq2lAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        : v
    }
  }, 
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
  ]
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;