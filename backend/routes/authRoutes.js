// routes/authRoutes.js
import express from 'express';
import { checkuserexistance } from '../controllers/checkusersignupController.js';
import { checkuserexistance2 } from '../controllers/checkuserloginController.js';
const router = express.Router();

router.post('/signup/checkuserexistance', checkuserexistance);
router.post('/login/checkuserexistance2', checkuserexistance2);

export default router;
