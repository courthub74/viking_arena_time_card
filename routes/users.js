// routes/users.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // ✅ Adjust if your model is named differently

// routes/users.js or similar
const User = require('../models/user');

// Sample User
// TEMP SEED ROUTE — REMOVE after use
// router.get('/seed-users', async (req, res) => {
//   try {
//     const User = require('../models/user'); // make sure path is correct

//     const sampleUsers = [
//       {
//         firstname: 'John',
//         lastname: 'Zamboni',
//         username: 'John Zamboni',
//         pin: '1234',
//         role: 'Zamboni Driver'
//       },
//       {
//         firstname: 'Sally',
//         lastname: 'Guard',
//         username: 'Sally Guard',
//         pin: '5678',
//         role: 'Skate Guard'
//       }
//     ];

//     await User.deleteMany(); // clears old test users
//     await User.insertMany(sampleUsers); // inserts new users

//     await User.insertMany(sampleUsers);
//     res.json({ message: '✅ Sample users inserted' });
//   } catch (err) {
//     console.error('❌ Error inserting users:', err);
//     res.status(500).json({ error: 'Failed to seed users' });
//   }
// });

// DEBUG ROUTER
// router.get('/debug-users', async (req, res) => {
//   const User = require('../models/user');
//   const users = await User.find();
//   console.log('Users:', users);
//   res.json(users);
// });

// REAL ROUTER
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // ✅ should return all users as JSON
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

module.exports = router;

