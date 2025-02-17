// // routes/vaccinationServiceRoutes.js
// const express = require('express');
// const router = express.Router();
// const vaccinationServiceController = require('../controllers/vaccinationServiceController');

// router.post('/services', vaccinationServiceController.createVaccinationService);
// router.get('/services', vaccinationServiceController.getVaccinationServices);
// router.post('/request-quotation', vaccinationServiceController.requestQuotation);

// module.exports = router;

// backend/routes/StandaloneServiceRoutes.js

import express from 'express';
// import {
//   uploadReport,getVaccinationReports,getVaccinationReportById ,updateVaccinationReportById ,deleteVaccinationReportById 
// } from '../controllers/vaccinationServiceController.js';
// } from '../controllers/vaccinationServiceController';
import { createMedicine} from '../controllers/medicineController.js';
import {Nursing} from '../controllers/nursingController.js'
import { Home } from '../controllers/homeController.js';
import { Vaccine } from '../controllers/vaccinationServiceController.js';
import { Lab } from '../controllers/labController.js';
const  router = express.Router();

// router.get('/vaccination', getVaccinationReports);
// router.get('/standalone-booking-vaccination-details/:id', getVaccinationReportById);
// router.get('/medicinedetails', MedicineDetails);
// router.get('/vaccination', getVaccinationReports);
// router.get('/vaccination', getVaccinationReports);


router.post('/vaccine', Vaccine);
router.post('/medicine', createMedicine);
router.post('/home', Home);
router.post('/nursing', Nursing);
router.post('/lab', Lab);


// router.get('/services', getVaccinationServices);
// router.post('/request-quotation', requestQuotation);

export default router;

