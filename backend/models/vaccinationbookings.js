
// import mongoose from 'mongoose';

// const vaccinationServiceSchema = new mongoose.Schema({
//   vaccine: [String],
//   patientName: String,
//   startDate: String,
//   prescription: String,
//   timeslot: String,
//   dhaCharge: { type: Number, default: 300 }
// });

// export default mongoose.model('VaccinationService', vaccinationServiceSchema);



import mongoose from 'mongoose';

const vaccinationbookingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vaccinationbookings',
        required: true,
      },
});

export default mongoose.model('vaccinationbookings', vaccinationbookingsSchema);
