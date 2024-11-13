const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Include bcrypt for password hashing
const User = require('../models/User');
const MoodLog = require('../models/Moodlog');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// Mood log route
router.post('/mood-log', async (req, res) => {
  const { mood, stress, sleep, userId } = req.body;

  try {
    console.log("Mood Log Request Data:", req.body); // Debugging log
    const newMoodLog = new MoodLog({ mood, stress, sleep, userId });
    await newMoodLog.save();
    res.status(201).json({ message: 'Mood logged successfully' });
  } catch (err) {
    console.error("Error logging mood:", err.message); // Error log
    res.status(500).json({ message: 'Error logging mood', error: err });
  }
});

// Appointment route
router.post('/appointment', async (req, res) => {
  const { name, email, phone, date, time, reason } = req.body;

  try {
    const newAppointment = new Appointment({ name, email, phone, date, time, reason });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error("Error booking appointment:", err.message);
    res.status(500).json({ message: 'Error booking appointment', error: err });
  }
});



// Test route to add test data
router.get('/test-add', async (req, res) => {
  try {
    const newUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: await bcrypt.hash('password123', 10),
    });

    await newUser.save();
    res.status(200).json({ message: 'Test data added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding test data', error: err });
  }
});

// Test POST route
router.post('/test', async (req, res) => {
  try {
    const testDoc = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testDoc);

    const newTestDoc = new TestModel({ name: 'Test' });
    await newTestDoc.save();

    res.status(200).json({ message: 'Data added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding data', error: err });
  }
});

module.exports = router;
