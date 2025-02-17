// rajcode01
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const BookingSchema = new mongoose.Schema({
  // labacceptedBy: {type:String, default:"None"}, 
  // labownerId: { type: String, default: null },
  labownermobile:String,
  labId:{ type: String, default:uuidv4 },
  bookingOtp:{type:Number,default:1888} ,
  // labreportId: { type: String, default:"None" },
  // labreportId: [mongoose.Schema.Types.ObjectId],
  labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  mobileNumber:{type:String , ref:'User'},
  Medicine: [String],
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  details: String,
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
  bookingId:String,
  price : {type:Number, default:null}, 
  discount : {type:Number, default:null}, 
  discountedPrice : {type:Number, default:null}, 
  dosage: { type: String },});

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
  mobile:String,
  bookings: [BookingSchema]
});

export default mongoose.model('Medicine23', LabSchema);
