const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
});

const bookingSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    date: { type: String, required: true }, 
    timeSlot: { type: String, required: true },
    sport:{type:String,required:true},
    price:{type:String,required:true},
    playerCount: { type: Number, required: true }
  });

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  location: { type: String },
  availability: { type: Boolean, default: true },
  pricePerHour: { type: Number },
  amenities: [String],
  image: { type: String },
  ratings: { type: Number, default: 0 },
  reviews: [reviewSchema],
  bookings: [bookingSchema],
  createdAt: { type: Date, default: Date.now },
});

const Turf = mongoose.model('Turf', turfSchema);
module.exports = Turf;
