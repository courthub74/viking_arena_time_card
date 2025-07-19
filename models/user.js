// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  pin: String,
  role: String
});

// module.exports = mongoose.model('User', userSchema);
// ✅ Only compile the model if it hasn't been compiled already
module.exports = mongoose.models.Employee || mongoose.model('Employee', userSchema);

