// routes/editprofileRoutes.js
import express from 'express';
import multer from 'multer';
import User1 from '../models/User1.js';
import User from '../models/User.js'; // Make sure to import the User model
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
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
      fullName: user.fullName,
      profilePhoto: user.profilePhoto,
      avatar: user.avatar,
      addressLine1: user.addressLine1,
      city: user.city,
      state: user.state,
      email: user.email,
      emergencyContactNumber: user.emergencyContactNumber
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.patch('/mobile/:mobileNumber', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    let user1 = await User1.findOne({ mobileNumber });
    let user = await User.findOne({ mobile: mobileNumber });

    if (!user1) {
      // Create a new User1 if not found
      user1 = new User1({ mobileNumber });
    }

    // Update User1 fields
    user1.fullName = req.body.fullName || user1.fullName;
    user1.addressLine1 = req.body.addressLine1 || user1.addressLine1;
    user1.city = req.body.city || user1.city;
    user1.state = req.body.state || user1.state;
    user1.email = req.body.email || user1.email;
    user1.emergencyContactNumber = req.body.emergencyContactNumber || user1.emergencyContactNumber;

    // Update avatar and profilePhoto if a new file is uploaded
    if (req.file) {
      user1.avatar = req.file.path;
      user1.profilePhoto = req.file.path;
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