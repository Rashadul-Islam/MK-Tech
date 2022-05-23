import express from 'express'
import { createEnroll, getEnroll, getApplied, confirmMember, progressMember, removeMember, progressProject, completedProject } from '../controllers/enrollController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createEnroll);
router.route('/getenroll/:id').get(protect, getEnroll);
router.route('/applied').post(protect, getApplied);
router.route('/confirmMember').post(protect, confirmMember);
router.route('/progressMember').post(protect, progressMember);
router.route('/removeMember').post(protect, removeMember);
router.route('/progressProject').post(protect, progressProject);
router.route('/completedProject').post(protect, completedProject);


export default router;