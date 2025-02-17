// backend/models/Alert.js

import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  patientName: String,
  message: String,  // You can add additional fields as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
