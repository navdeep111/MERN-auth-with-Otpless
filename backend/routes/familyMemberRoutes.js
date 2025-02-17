// routes/familyMemberRoutes.js
import express from 'express';
import { getFamilyMembers, createFamilyMember, updateFamilyMember, deleteFamilyMember } from '../controllers/fmController.js';

const router = express.Router();

router.get('/:mobileNumber', getFamilyMembers);
router.post('/', createFamilyMember);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

export default router;