// import express from 'express';
// import { sendOtp, checkOtp } from '../controllers/otpController1.js';
// import { uploadReport } from '../controllers/uploadReport.js';

// const router = express.Router();

// router.post('/send-otp', sendOtp);
// router.post('/check-otp', checkOtp);
// router.post('/uploadreport', uploadReport);
// export default router;


//practice

//backend/routes/otpRoutes.js
import express from 'express';
import { sendOtp, checkOtp } from '../controllers/otpController1.js';
// import { uploadReport, fetchReports} from '../controllers/uploadReport.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/check-otp', checkOtp);
// router.post('/uploadreport', uploadReport);
// router.get('/reports', fetchReports);


export default router;

