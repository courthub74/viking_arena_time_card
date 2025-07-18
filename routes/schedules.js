// server.js or routes/schedules.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule'); // Mongoose model


router.get('/schedules', async (req, res) => {
  const { start, end } = req.query;

  console.log('Received /schedules request:', { start, end });

  if (!start || !end) {
    return res.status(400).json({ error: 'Missing start or end date' });
  }

  try {
    const schedules = await Schedule.find({
      date: { $gte: start, $lte: end }
    });

    console.log(`Returning ${schedules.length} schedule(s)`);
    res.json(schedules); // Always valid JSON ✅
  } catch (err) {
    console.error("❌ Failed to fetch schedules:", err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
