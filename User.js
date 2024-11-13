const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
});

// Hash the password before saving the user document
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      // Hash the password with 10 salt rounds
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();  // Proceed without modifying if password wasn't changed
  }
});

// Method to compare a given password with the stored hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Compare the candidate password with the stored hashed password
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Error comparing password');
  }
};

module.exports = mongoose.model('User', userSchema);
