const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: true,
    isNumeric: true,
    isMobilePhone: {
      options: {
        locale: 'en-US',
      },
    },
  },
});

module.exports = User = mongoose.model('user', UserSchema);
