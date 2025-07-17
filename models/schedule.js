// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: String,
  drivers: [{
    name: String,
    zam_in: String,
    zam_out: String
  }],
  skate_guards: [{
    name: String,
    time_in: String,
    time_out: String
  }]
});

module.exports = mongoose.model('Schedule', scheduleSchema);
