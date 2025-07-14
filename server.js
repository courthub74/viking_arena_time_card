const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');

// Connect to MongoDB
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

// Middleware
app.use(cors());

connectDB();

app.use(express.json());

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files for dashboards
app.get('/employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/dashboards/employee.html'));
});
app.get('/manager', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/dashboards/manager.html'));
});


mongoose.connect('mongodb://localhost:27017/users')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Hook Router
const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);
