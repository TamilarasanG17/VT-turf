const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },  // To store OTP temporarily
  otpExpires: { type: Date, default: null }  // Expiry time for OTP
});

module.exports = mongoose.model('User', userSchema);
