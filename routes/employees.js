const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET all employee names
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find().select('firstname lastname role'); // Include 'role' here
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST LOGIN with name and pin
router.post('/login', async (req, res) => {
  const { name, pin } = req.body;

  try {
    const [first, last] = name.trim().split(' ');
    const employee = await Employee.findOne({ firstname: first, lastname: last });

    if (!employee) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const pinMatch = await bcrypt.compare(pin, employee.pin);
    if (!pinMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect PIN' });
    }

    res.json({
      success: true,
      employee: {
        firstname: employee.firstname,
        lastname: employee.lastname,
        role: employee.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



// POST new employee
router.post('/', async (req, res) => {
  const newEmployee = new Employee(req.body);
  const saved = await newEmployee.save();
  res.json(saved);
});

// GET the employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// POST the registration
router.post('/register', async (req, res) => {
  const { firstname, lastname, pin, role } = req.body;

  try {
    const hashedPin = await bcrypt.hash(pin, 10); // saltRounds = 10

    const newEmployee = new Employee({
      firstname,
      lastname,
      pin: hashedPin,
      role,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, message: 'Employee registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// EMPLOYEE HOURS LOGGING
// Log employee work entry (add to workHistory)
router.post('/log-work', async (req, res) => {
  const { firstname, lastname, entry } = req.body;

  try {
    const employee = await Employee.findOne({ firstname, lastname });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Initialize workHistory if undefined
    if (!employee.workHistory) {
      employee.workHistory = [];
    }

    employee.workHistory.push(entry);
    await employee.save();

    res.json({ success: true, message: 'Work entry logged', employee });
  } catch (err) {
    console.error("Error logging work:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// HOURS for a specific employee
router.post('/work-history', async (req, res) => {
  const { firstname, lastname } = req.body;

  try {
    const employee = await Employee.findOne({ firstname, lastname });

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, workHistory: employee.workHistory || [] });
  } catch (err) {
    console.error("Error retrieving work history:", err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET work history by firstname/lastname (case-insensitive)
router.get('/work-history/:firstname/:lastname', async (req, res) => {
  const { firstname, lastname } = req.params;

  try {
    console.log("🔎 Looking up work history for:", firstname, lastname);

    const employee = await Employee.findOne({
      firstname: { $regex: `^${firstname}$`, $options: 'i' },
      lastname: { $regex: `^${lastname}$`, $options: 'i' }
    });

    if (!employee) {
      console.warn("⚠️ Employee not found:", firstname, lastname);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ workHistory: employee.workHistory || [] });
  } catch (err) {
    console.error("❌ Error retrieving work history:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});


module.exports = router;
