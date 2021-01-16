const mongoose = require('mongoose');
const database = require('./index.js');

const { Schema } = mongoose;

const listingSchema = new Schema({
  nightlyRate: { type: Number, required: true },
  averageRating: { type: Number, required: true, default: 0 },
  reviewCount: { type: Number, required: true, default: 0 },
  minNights: { type: Number, required: true, default: 1 },
  bookedDates: [
    {
      start: { type: Date },
      length: { type: Number },
    },
  ],
  maxGuests: { type: Number, required: true, default: 2 },
  cleaningFee: { type: Number, required: true, default: 0 },
  serviceFee: { type: Number, required: true, default: 0 },
  occupancyTaxesAndFees: { type: Number, required: true, default: 0 },
  discountWeekly10: { type: Number, required: true, default: 0 },
  discountWeekly20: { type: Number, required: true, default: 0 },
  discountMonthly20: { type: Number, required: true, default: 0 },
},
{
  timestamps: true,
});

module.exports.Listing = mongoose.model('Listing', listingSchema);
