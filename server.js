const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const router = express.Router();


// Route: GET work history for a specific user
app.get('/api/work-history/:firstname/:lastname', async (req, res) => {
  const { firstname, lastname } = req.params;

  try {
    const user = await db.collection('employees').findOne({
      firstname: { $regex: `^${firstname}$`, $options: 'i' },
      lastname: { $regex: `^${lastname}$`, $options: 'i' }
    });

    if (!user) {
      console.warn("User not found for:", firstname, lastname); // log here
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ workhistory: user.workhistory || [] });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});




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

// For Employees in the Dropdown
const Employee = require('./models/employee');

router.get('/users', async (req, res) => {
  try {
    const users = await Employee.find({}, 'username role'); // Fetch only needed fields
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Schedule Routes server.js
const scheduleRoutes = require('./routes/schedules');
app.use('/api', scheduleRoutes); // ✅ this must exist


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


// Mount Employees Routes
app.use('/api/employees', require('./routes/employees'));
// Mount User Routes
const usersRoute = require('./routes/users');
app.use('/api', usersRoute); // ✅ This exposes /api/users


module.exports = router;