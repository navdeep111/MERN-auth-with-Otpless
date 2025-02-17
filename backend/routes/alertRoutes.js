// routes/alertRoutes.js

import express from 'express';
import { getAlert} from "../controllers/alertController.js";

const router = express.Router();

// GET urgent bookings
router.post('/', getAlert);

export default router;
