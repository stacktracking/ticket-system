const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transportType: { type: String, enum: ['Bus', 'Train', 'Plane'], required: true },
    route: {
      from: { type: String, default: '' },
      to: { type: String, default: '' }
    },
    date: { type: String, default: '' },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
