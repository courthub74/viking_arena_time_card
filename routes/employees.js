const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const saltRounds = 10;
    

// GET all employee names
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find({}, 'firstname lastname');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err });
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

module.exports = router;
