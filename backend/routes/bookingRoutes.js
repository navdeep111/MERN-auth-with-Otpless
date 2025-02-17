// import express from 'express';
// import { createBookingStandalone, createBookingUrgent } from '../controllers/bookingController.js';

// const router = express.Router();

// // Route for BookingStandalone
// router.post('/standalone', createBookingStandalone);

// // Route for BookingforUrgent
// router.post('/urgent', createBookingUrgent);

// export default router;


// routes/bookingRoutes.js
import express from 'express';
import {
  createBookingUrgent,
  getAllIncoming,
  getAllPending,
  getAllCompleted
  
} from '../controllers/bookingController.js';
import { acceptBooking,rejectBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route for BookingStandalone
// router.post('/standalone', createBookingStandalone);
// router.get('/standalone', getAllBookingStandalone);

// Route for BookingforUrgent
router.post('/create', createBookingUrgent);
router.post('/incoming', getAllIncoming);
router.post('/pending', getAllPending);
router.post('/completed', getAllCompleted);

// Route for Accept Reject
router.post('/:id/accept', acceptBooking);
router.post('/:id/reject', rejectBooking);

// router.post('/booking/:bookingId/accept', acceptBooking);
// router.post('/booking/:bookingId/reject', rejectBooking);

export default router;
