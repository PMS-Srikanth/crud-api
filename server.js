require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import our User model

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the User CRUD API!');
});

// CREATE: Add a new user
app.post('/api/users', async (req, res) => {
  try {
    // 1. Get the data from the request body (Thunder Client/Postman)
    const { name, email, age } = req.body;

    // 2. Create a new User document in memory
    const newUser = new User({ name, email, age });

    // 3. Save it to the database
    const savedUser = await newUser.save();

    // 4. Send back a success response
    res.status(201).json(savedUser);
  } catch (error) {
    // If something goes wrong (like missing a required field or duplicate email)
    res.status(400).json({ message: error.message });
  }
});

// READ ALL: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetches all documents
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE: Get a specific user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Modify an existing user
app.put('/api/users/:id', async (req, res) => {
  try {
    // findByIdAndUpdate(id, dataToUpdate, { new: true } ensures it returns the newly updated document)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
