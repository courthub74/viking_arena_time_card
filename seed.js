const mongoose = require('mongoose');
const Employee = require('./models/employee'); // Adjust path if needed

// Sample employees
const sampleEmployees = [
  {
    firstname: 'Tim',
    lastname: 'Smith',
    pin: '7890',
    role: 'Manager',
    workHistory: [
      { date: '2025-07-10', inTime: '09:00', outTime: '17:00' },
      { date: '2025-07-11', inTime: '08:45', outTime: '17:15' }
    ],
    messages: {
      sent: ['Check inventory', 'Update schedule'],
      received: ['Meeting at 2pm', 'Confirm delivery']
    }
  },
  {
    firstname: 'Roy',
    lastname: 'Marsac',
    pin: '5678',
    role: 'Zamboni',
    workHistory: [
      { date: '2025-07-12', inTime: '08:00', outTime: '16:00' }
    ],
    messages: {
      sent: ['Clocked in late'],
      received: ['Reminder: arrive early tomorrow']
    }
  },
];

// Connect and seed
async function seedDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/employeeDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Employee.deleteMany(); // Clears existing data
    const inserted = await Employee.insertMany(sampleEmployees);
    console.log(`✅ Seeded ${inserted.length} employees`);

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDB();
