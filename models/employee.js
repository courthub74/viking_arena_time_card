const mongoose = require('mongoose');

const workEntrySchema = new mongoose.Schema({
  date: String,
  inTime: String,
  outTime: String,
});

const messageSchema = new mongoose.Schema({
  sent: [String],
  received: [String],
});

const employeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  pin: { type: String, required: true },
  role: { type: String, required: true },
  workHistory: [workEntrySchema],
  messages: messageSchema
});


module.exports = mongoose.model('Employee', employeeSchema);

