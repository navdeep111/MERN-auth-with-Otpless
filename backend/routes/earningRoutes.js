// backend/routes/earningRoutes.js
import express from 'express';
import { getEarnings} from '../controllers/earningController.js';
import { getAvailable } from '../controllers/AvailableController.js';
import { getHistory } from '../controllers/historyController.js';
// import { getThistory } from '../controllers/historyController.js';


const router = express.Router();

router.post('/total', getEarnings);
router.post('/available', getAvailable);
router.post('/history',getHistory); // New route
// router.post('/thistory',getThistory); // New route

export default router;

