const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

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
