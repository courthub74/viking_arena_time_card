// routes/users.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/user'); // ✅ now this returns the 'Employee' model using the 'employees' collection

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await Employee.find(); // ✅ this queries 'employees' collection
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

module.exports = router;

