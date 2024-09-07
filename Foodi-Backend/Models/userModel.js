const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    minlength: 3,
    unique: true,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    require: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
