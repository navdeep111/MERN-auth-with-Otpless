
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Schema for individual bookings
const BookingSchema = new mongoose.Schema({
  labownermobile:String,
  labacceptedBy: {type:String, default:"None"}, 
  labownerId: { type: String, default: null },
  labId:{ type: String, default:uuidv4 },
  bookingOtp:{type:Number,default:1888} ,
  // labreportId: { type: String, default:"None" },
  // prescription: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads' }], // GridFS file IDs
  labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  mobileNumber:String,
  Vaccine: [String], // List of vaccines
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  details:String,
 
  timeslot: String,
  dhaCharge: { type: Number, default: 300 },
  Rank: {
    type: String,
    enum: ["Lab Assigned", "DHA Service Started", "DHA Assigned", "Pharmacy Assigned"],
    default: "Lab Assigned"
  },
  status: {
    type: String,
    enum: ["incoming", "completed", "cancelled", "pending"],
    default: "incoming"
  },
  bookingId: { type: String, unique: true },
  price : {type:Number, default:null}, 
  discount : {type:Number, default:null}, 
  discountedPrice : {type:Number, default:null}, 
  dosage: { type: String,default:null}
});

// Middleware to generate booking ID before saving a new booking
BookingSchema.pre('save', function (next) {
  if (this.isNew) {
    const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
    const agePart = this.patientAge.toString().slice(0, 2);
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    this.bookingId = namePart + agePart + randomPart;
  }
  next();
});

// Schema for storing all bookings associated with a user
const VaccinationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [BookingSchema]
});

// Export the Vaccination model
export default mongoose.model('vaccination10', VaccinationSchema);
