
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  labTests: [String],
  patientName: String,
  address: String,
  charges: Number,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Reject', 'Incoming'],
    default: 'Incoming'
  }
});

const userBookingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [bookingSchema]
});

const UserBookings = mongoose.model('urgent23', userBookingsSchema);

export default UserBookings;
