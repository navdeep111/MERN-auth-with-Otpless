import express from 'express';

import { getMedicine } from '../controllers/medicineController3.js';
import { getNursing } from '../controllers/nursingController3.js'
import { getHome } from '../controllers/homeController3.js';
import { getVaccine } from '../controllers/vaccinationServiceController3.js';
import { getLab } from '../controllers/labController3.js';
import { getUrgent } from '../controllers/UrgentCaseController3.js';
const router = express.Router();

router.post('/vaccine', getVaccine);
router.post('/medicine', getMedicine);
router.post('/home', getHome);
router.post('/nursing', getNursing);
router.post('/lab', getLab);
router.post('/urgent', getUrgent);

export default router;

