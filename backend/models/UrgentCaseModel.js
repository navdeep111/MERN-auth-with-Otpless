// //UrgentCaseModel.js
// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema({
//   mobileNumber: String,
//   symptoms: {
//     type: [String],
//     required: true,
//   },
//   patientName: {
//     type: String,
//     required: true,
//   },
//   patientAge: Number,
//   patientsNote: {
//     type: String,
//     default: "",
//   },
//   videoNote: {
//     type: String, // Stores the video file name
//   },
//   videoFileId: {
//     type: mongoose.Schema.Types.ObjectId, // Stores the video file ID
//   },
//   Rank: {
//     type: String,
//     enum: ["ToBeChanged1", "ToBeChanged2", "ToBeChanged3"],
//     default: "DEFAULT",
//   },
//   status: {
//     type: String,
//     enum: ["incoming", "completed", "cancelled", "pending"],
//     default: "incoming",
//   },
//   bookingId: { type: String, unique: true },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// BookingSchema.pre("save", function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName
//       .replace(/\s+/g, "")
//       .substring(0, 4)
//       .toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const urgentCaseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   bookings: [BookingSchema],
// });

// const UrgentCase = mongoose.model("UrgentCase", urgentCaseSchema);

// export default UrgentCase;

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const BookingSchema = new mongoose.Schema({
  urgentCaseAcceptedByid: { type: String, default: null },
  mobileNumber: String,
  symptoms: {
    type: [String],
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAge: Number,
  patientsNote: {
    type: String,
    default: "",
  },
  videoNote: {
    type: String, // Stores the video file name
  },
  videoFileId: {
    type: mongoose.Schema.Types.ObjectId, // Stores the video file ID
  },
  Rank: {
    type: String,
    enum: ["ToBeChanged1", "ToBeChanged2", "ToBeChanged3"],
    default: "ToBeChanged1",
  },
  status: {
    type: String,
    enum: ["incoming", "completed", "cancelled", "pending"],
    default: "incoming",
  },
  bookingId: { type: String, unique: true },
  patientBookingId: { type: String, unique: true },
  urgentCharges: { type: Number, default: 999 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingSchema.pre("save", function (next) {
  if (this.isNew) {
    const namePart = this.patientName
      .replace(/\s+/g, "")
      .substring(0, 4)
      .toUpperCase();
    const agePart = this.patientAge.toString().slice(0, 2);
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    this.bookingId = namePart + agePart + randomPart;
  }
  next();
});

const UrgentCaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookings: [BookingSchema],
});

const UrgentCase = mongoose.model("UrgentCase", UrgentCaseSchema);

export default UrgentCase;
