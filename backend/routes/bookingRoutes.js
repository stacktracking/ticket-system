const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// POST /api/bookings  (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { transportType, route, date, seats, totalPrice } = req.body;

    if (!transportType || !seats || !seats.length) {
      return res.status(400).json({ error: 'Missing booking details' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      transportType,
      route,
      date,
      seats,
      totalPrice
    });

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not complete booking' });
  }
});

// GET /api/bookings/my  (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load bookings' });
  }
});

module.exports = router;
