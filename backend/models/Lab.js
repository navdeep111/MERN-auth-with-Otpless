// //final code 
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';


// // Define a sub-schema for the timer data
// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// const BookingSchema = new mongoose.Schema({
//   labacceptedBy: {type:String, default:"None"}, 
//   labacceptedByid: { type: String, default:uuidv4 },
//   labId:{ type: String, default:uuidv4 },
//   bookingOtp:{type:String,default:"1888"} ,
//   // Storing hours, minutes, and seconds separately using the TimerSchema
//   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },  mobileNumber:String,
//   Lab: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details:String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   timeslot: String,
//   dhaCharge: { type: Number, default: 100 },
//   Rank: {
//     type: String,
//     enum: ["labAssigned", "draServicestarted", "draAssigned", "pharmacyAssigned"],
//     default: "labAssigned"
//   },
//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming"
//   },
//   bookingId: { type: String, unique: true }
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default mongoose.model('Lab23', LabSchema);


// //working Schema
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';


// const BookingSchema = new mongoose.Schema({
//   labacceptedBy: {type:String, default:"None"}, 
//   labacceptedByid: { type: String, default:uuidv4 },
//   labId:{ type: String, default:uuidv4 },
//   bookingOtp:{type:Number,default:1888} ,
//   timerData:{type:Number,default:300},
//   mobileNumber:String,
//   Lab: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details:String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   timeslot: String,
//   dhaCharge: { type: Number, default: 100 },
//   Rank: {
//     type: String,
//     enum: ["labAssigned", "draServicestarted", "draAssigned", "pharmacyAssigned"],
//     default: "labAssigned"
//   },
//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming"
//   },
//   bookingId: { type: String, unique: true }
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default mongoose.model('Lab23', LabSchema);


// //practice Schema
// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';


// const BookingSchema = new mongoose.Schema({
//   labacceptedBy: {type:String, default:"None"}, 
//   labacceptedByid: { type: String, default:uuidv4 },
//   labId:{ type: String, default:uuidv4 },
//   bookingOtp:{type:Number,default:1888} ,
//   timerData:{type:Number,default:300},
//   mobileNumber:String,
//   Lab: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   details:String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   timeslot: String,
//   dhaCharge: { type: Number, default: 100 },
//   Rank: {
//     type: String,
//     enum: ["labAssigned", "draServicestarted", "draAssigned", "pharmacyAssigned"],
//     default: "labAssigned"
//   },
//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming"
//   },
//   bookingId: { type: String, unique: true }
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const LabSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// export default mongoose.model('Lab23', LabSchema);


//practice Schema
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define a sub-schema for the timer data
const TimerSchema = new mongoose.Schema({
  hours: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
  seconds: { type: Number, default: 0 }
});


const BookingSchema = new mongoose.Schema({
  labacceptedBy: {type:String, default:"None"}, 
  labownerId: { type: String, default: null },
  labId:{ type: String, default:uuidv4 },
  bookingOtp:{type:Number,default:1888} ,
  timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
  // labreportId: { type: String, default:"None" },
  // prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  mobileNumber:String,
  Lab: [String],
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  details:String,
  
  timeslot: String,
  dhaCharge: { type: Number, default: 100 },
  Rank: {
    type: String,
    enum: ["labAssigned", "draServicestarted", "draAssigned", "pharmacyAssigned"],
    default: "labAssigned"
  },
  status: {
    type: String,
    enum: ["incoming", "completed", "cancelled", "pending"],
    default: "incoming"
  },
  bookingId: { type: String}
});

BookingSchema.pre('save', function (next) {
  if (this.isNew) {
    const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
    const agePart = this.patientAge.toString().slice(0, 2);
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    this.bookingId = namePart + agePart + randomPart;
  }
  next();
});

const LabSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema]
});

export default mongoose.model('Lab23', LabSchema);
