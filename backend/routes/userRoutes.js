// import express from 'express';
// const router = express.Router();
// import { createUser, getUserById } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';

// router.post('/createuser', createUser);
// router.get('/getuser/:id', getUserById);

// export default router;

//practice

// backend/routes/userRoutes.js
import express from 'express';
import User1 from '../models/User1.js';
const router = express.Router();
import { createUser, getUserById } from '../controllers/userController.js';
import { getUserByBookingId } from "../controllers/getUserByBookingId.js"
// import  userdetails  from "../controllers/userdetails.js"
import { getUserDetailsByMobileNumber } from '../controllers/userdetails.js'; // Ensure correct path





router.post('/createuser', createUser);
router.get('/getuser/:id', getUserById);


//kamalcode
// router.get('/api/user1/:id', async (req, res) => {
//     const { mobileNumber } = req.params;

//     try {
//         // Find user by mobile number in the User1 collection
//         const user = await User1.findOne({ mobileNumber });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
router.get('/api/user1/:Id', getUserByBookingId) 
router.get('/:mobileNumber', getUserDetailsByMobileNumber);

export default router;
