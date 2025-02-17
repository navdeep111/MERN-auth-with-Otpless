// backend/models/Document.js

import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  // Other fields as per your requirement
  aadharCards: [{
    type: String, // Assuming storing file paths
    required: true
  }],
  // Other fields
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
