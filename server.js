const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/employeeDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
app.use(cors());

connectDB();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);
