const express = require('express');
const router = express.Router();
const Turf = require('../models/turf');

router.get('/turfs', async (req, res) => {
    const cityQuery = req.query.city || '';
    try {
        const turfs = await Turf.find({ city: { $regex: cityQuery, $options: 'i' } });

        turfs.forEach(turf => {
            if (turf.image) {
                console.log(`Image path for turf ${turf.name}: ${turf.image}`);
            }
        });
        const turfsWithImages = turfs.map(turf => ({
            ...turf.toObject(),
            imageUrl: `/images/${turf.image}` 
        }));
        
        res.json(turfsWithImages);
    } catch (error) {
        console.error('Error retrieving turfs:', error);
        res.status(500).json({ message: 'Failed to retrieve turfs' });
    }
});

router.get('/turf/:id', async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    res.json(turf);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching turf details' });
  }
});

router.post('/turf/:id/review', async (req, res) => {
  const { reviewerName, rating, text } = req.body;

  if (!reviewerName || !rating || !text) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    turf.reviews.push({ reviewerName, rating, text });
    await turf.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review' });
  }
});

router.delete('/reviews/:turfId/:reviewId', async (req, res) => {
    try {
      const { turfId, reviewId } = req.params;
      const turf = await Turf.findById(turfId);
      if (!turf) return res.status(404).json({ message: 'Turf not found' });
      const reviewIndex = turf.reviews.findIndex((review) => review._id.toString() === reviewId);
      if (reviewIndex === -1) return res.status(404).json({ message: 'Review not found' });
  
      turf.reviews.splice(reviewIndex, 1); 
      await turf.save(); 
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Failed to delete review' });
    }
  });

  router.post('/turf/:id/book', async (req, res) => {
    const { id } = req.params;
    const { name,email,date, timeSlot, playerCount,sport,price } = req.body;
  
    try {
      const turf = await Turf.findById(id);
      if (!turf) {
        console.error(`Turf with id ${id} not found`);
        return res.status(404).json({ message: 'Turf not found' });
      }
  
      const isBooked = turf.bookings && turf.bookings.some(
        booking => booking.date === date && booking.timeSlot === timeSlot
      );
  
      if (isBooked) {
        return res.status(409).json({ message: 'Time slot already booked' });
      } else {
        turf.bookings.push({name,email, date, timeSlot, playerCount,sport,price });
        await turf.save();
        res.status(200).json({ message: 'Booking confirmed' });
      }
    } catch (error) {
      console.error('Error creating booking:', error); 
      res.status(500).json({ message: 'Error creating booking' });
    }
  });

  

module.exports = router;
