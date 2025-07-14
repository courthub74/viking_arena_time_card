const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
    

// GET all employee names
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find({}, 'name'); // Only return name field
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch employees', error: err });
  }
});

// POST login with name and pin
router.post('/login', async (req, res) => {
  const { name, pin } = req.body;

  try {
    const employee = await Employee.findOne({ name, pin });

    if (!employee) {
      return res.status(401).json({ success: false, message: 'Invalid name or pin' });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      employee: {
        name: employee.name,
        role: employee.role,
        pin: employee.pin // Optional: remove if you don’t want to expose pin
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login error', error: err });
  }
});



router.post('/', async (req, res) => {
  const newEmployee = new Employee(req.body);
  const saved = await newEmployee.save();
  res.json(saved);
});

router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

module.exports = router;
