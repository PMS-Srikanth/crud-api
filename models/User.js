const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  age: {
    type: Number,
    required: false,
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
});

module.exports = mongoose.model('User', userSchema);
