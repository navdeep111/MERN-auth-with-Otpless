import mongoose from 'mongoose';

const urgentVideoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
  description: { type: String },
});

const UrgentVideo = mongoose.model('UrgentVideo', urgentVideoSchema);

export default UrgentVideo;
