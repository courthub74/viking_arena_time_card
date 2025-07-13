const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  clockIn: Date,
  clockOut: Date
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
