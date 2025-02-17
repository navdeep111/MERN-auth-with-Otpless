// routes/documents.js
import express from 'express';
import multer from 'multer';
import User1 from '../models/User1.js';
import User from '../models/User.js'; // Import the User model
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/mobile/:mobileNumber', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      physicalAssessmentPhoto: user.physicalAssessmentPhoto,
      height: user.height,
      weight: user.weight,
      age: user.age,
      bloodGroup: user.bloodGroup,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch('/mobile/:mobileNumber', upload.single('physicalAssessmentPhoto'), async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    let user1 = await User1.findOne({ mobileNumber });
    let user = await User.findOne({ mobile: mobileNumber });

    if (!user1) {
      // Create a new User1 if not found
      user1 = new User1({ mobileNumber });
    }

    // Update User1 fields
    user1.height = req.body.height || user1.height;
    user1.weight = req.body.weight || user1.weight;
    user1.age = req.body.age || user1.age;
    user1.bloodGroup = req.body.bloodGroup || user1.bloodGroup;
    user1.gender = req.body.gender || user1.gender;

    // Update physicalAssessmentPhoto if a new file is uploaded
    if (req.file) {
      user1.physicalAssessmentPhoto = req.file.path;
    }

    // Save User1
    const updatedUser1 = await user1.save();

    // Update User reference to User1
    if (user) {
      user.User1 = updatedUser1._id;
      await user.save();
    } else {
      console.log(`No User found for mobile number: ${mobileNumber}`);
    }

    res.json(updatedUser1);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;