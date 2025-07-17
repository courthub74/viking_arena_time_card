// server.js or routes/schedules.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule'); // Mongoose model

router.post('/api/schedules', async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).json({ message: 'Schedule saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});

module.exports = router;
