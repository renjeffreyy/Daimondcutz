const mongoose = require('mongoose');
const router = require('../routes/api/googleCalendar');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);
