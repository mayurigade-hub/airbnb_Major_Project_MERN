const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

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

listingSchema.post('findOneAndDelete', async function (listing){
  if(listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;