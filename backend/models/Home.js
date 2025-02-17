// //final code 
// import mongoose from 'mongoose';

// const BookingSchema = new mongoose.Schema({
//   Lab: [String],
//   patientName: String,
//   careType: String,
//   cost: { type: Number},
//   patientGender: String,
//   startDate: String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   timeslot: String,
//   dhaCharge: { type: Number, default: 300 },
//   Rank: {
//     type: String,
//     enum: ["Lab Assigned", "DHA Service Started", "DHA Assigned", "Pharmacy Assigned"],
//     default: "Lab Assigned"
//   },
//   status: {
//     type: String,
//     enum: ["upcoming", "Completed", "Cancelled"],
//     default: "upcoming"
//   },
//   bookingId: { type: String, unique: true }
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     // const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
//     this.bookingId = namePart + randomPart;
//   }
//   next();
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default mongoose.model('Home10', LabSchema);


//final code 
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  mobileNumber:String,
  Lab: [String],
  patientName: String,
  careType: { type: String, enum: ['DailyBasis', 'WeeklyBasis', 'MonthlyBasis'], default: "DailyBasis" },
  cost: { type: Number },
  patientGender: String,
  startDate: String,
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  timeSlot: String,
  dhaCharge: { type: Number, default: 300 },
  Rank: {
    type: String,
    enum: ["Lab Assigned", "DHA Service Started", "DHA Assigned", "Pharmacy Assigned"],
    default: "Lab Assigned"
  },
  status: {
    type: String,
    enum: ["upcoming", "Completed", "Cancelled"],
    default: "upcoming"
  },
  bookingId: { type: String, unique: true }
});

BookingSchema.pre('save', function (next) {
  if (this.isNew) {
    const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    this.bookingId = namePart + randomPart;
  }
  next();
});

const LabSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema]
});

export default mongoose.model('Home23', LabSchema);
