import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';  // Note the `.js` extension for ES6 module compatibility
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import User from './models/User.js';
import User1 from './models/User1.js';




const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

app.use(bodyParser.json());
app.use(cors("*"));


// Connect to database
connectDB();



const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://Gupta:Gupta@cluster1.bsa7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', // Update with your MongoDB URI
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
// app.use('/api/otp', otpRoutes );
// app.use('/api/otp', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/timer', timerRoutes);
// app.use('/api/booking', bookingRoutes);
// app.use('/api/alerts', alertRoutes);
// app.use('/api/bookingservice', bookingserviceRoutes);
// // app.use('/api/earning', getEarning);
// app.use('/api/earning', earningRoutes);
// app.use('/api/withdraw', withdrawRoutes);

// // yugalcode
// // app.use('/api/bankinfo', bankInfoRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/profile', editprofileRoutes);
// app.use('/api/logout', logoutRoutes);
// // yugalcode

// app.use('/api/familyMembers', familyMemberRoutes);
// app.use('/api/urgentbooking', urgentCaseRoutes);
// app.use('/api/sd2', urgentCaseRoutes);
// app.use('/api/sd', StandaloneServiceRoutes);
// // app.use('/api/sd3', StandaloneServiceRoutes3);
// app.use('/api/sd3', StandaloneServiceRoutes3);


// http://localhost:5000/api/urgentbooking/urgent-cases

// Signup Step 1
app.post('/api/signup1', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { fullName, addressLine1, city, state, email, emergencyContactNumber, mobileNumber } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;
    const avatar = req.body.avatar;

    // Find or create User1 entry
    let user1 = await User1.findOne({ mobileNumber });
    console.log(mobileNumber);

    if (!user1) {
      user1 = new User1({ mobileNumber });
    }

    user1.fullName = fullName;
    user1.addressLine1 = addressLine1;
    user1.city = city;
    user1.state = state;
    user1.email = email;
    user1.emergencyContactNumber = emergencyContactNumber;
    user1.profilePhoto = profilePhoto;
    user1.avatar = avatar;
    user1.signupStep = 1;
    user1.signupCompleted = true; // Assuming signup step 1 is considered completed here

    // Ensure 'user' field in User1 is populated with the corresponding User's _id
    const user = await User.findOne({ mobile: mobileNumber });
    if (user) {
      user1.user = user._id;
    } else {
      throw new Error('User not found'); // Handle case where user is not found
    }

    await user1.save();

    if (!user.User1.includes(user1._id)) {
      user.User1.push(user1._id);
      await user.save();
    }

    res.status(200).json({ message: 'Step 1 completed successfully' });
  } catch (error) {
    console.error('Error in step 1:', error);
    res.status(500).json({ message: 'Error in step 1', error: error.message });
  }
});

// Signup Step 2
app.post('/api/signup2', upload.single('physicalAssessmentPhoto'), async (req, res) => {
  try {
    const { height, weight, bloodGroup, mobileNumber,age} = req.body;
    const physicalAssessmentPhoto = req.file ? req.file.filename : null;
    const mobile = String(mobileNumber).trim();

    console.log('Received data for signup step 2:', req.body); // Debug statement

    let user1 = await User1.findOne({ mobileNumber });
    if (!user1) {
      return res.status(404).json({ message: 'User not found' });
    }

    user1.physicalAssessmentPhoto = physicalAssessmentPhoto;
    user1.height = height;
    user1.weight = weight;
    user1.age = age;
    user1.bloodGroup = bloodGroup;
    user1.signupStep = 2;

    await user1.save();

    res.status(200).json({ message: 'Step 2 completed successfully' });
  } catch (error) {
    console.error('Error in step 2:', error);
    res.status(500).json({ message: 'Error in step 2', error: error.message });
  }
});

// Signup Step 3
app.post('/api/signup3', async (req, res) => {
  try {
    const { anyDisease, diseases, mobileNumber } = req.body;
    const mobile = String(mobileNumber).trim();

    console.log('Received data for signup step 3:', req.body); // Debug statement

    let user1 = await User1.findOne({ mobileNumber: mobile });
    if (!user1) {
      return res.status(404).json({ message: 'User profile not found. Please complete steps 1 and 2 first.' });
    }

    user1.anyDisease = anyDisease;
    user1.diseases = anyDisease === 'Yes' ? diseases : [];
    user1.signupStep = 3;
    user1.signupCompleted = true;

    await user1.save();

    res.status(200).json({ message: 'Signup completed successfully' });
  } catch (error) {
    console.error('Error in step 3:', error);
    res.status(500).json({ message: 'Error in step 3', error: error.message });
  }
});

// Get diseases for a user
app.get('/api/diseases/:mobileNumber', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const user1 = await User1.findOne({ mobileNumber: String(mobileNumber).trim() });
    if (!user1) {
      return res.status(404).json({ message: 'User profile not found.' });
    }
    res.status(200).json({ diseases: user1.diseases });
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({ message: 'Error fetching diseases', error: error.message });
  }
});

// Update diseases for a user
app.post('/api/updateDiseases', async (req, res) => {
  try {
    const { mobileNumber, diseases } = req.body;
    const mobile = String(mobileNumber).trim();

    let user1 = await User1.findOne({ mobileNumber: mobile });
    if (!user1) {
      // Create new User1 if not found
      user1 = new User1({ mobileNumber: mobile });
    }

    user1.diseases = diseases;
    const updatedUser1 = await user1.save();

    // Find or create User and update reference to User1
    let user = await User.findOne({ mobile: mobile });
    if (!user) {
      user = new User({ mobile: mobile });
    }
    user.User1 = updatedUser1._id;
    await user.save();

    res.status(200).json({ message: 'Diseases updated successfully' });
  } catch (error) {
    console.error('Error updating diseases:', error);
    res.status(500).json({ message: 'Error updating diseases', error: error.message });
  }
});


app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html')); });


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

