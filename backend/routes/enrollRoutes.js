import express from 'express'
import { createEnroll, getEnroll, getApplied } from '../controllers/enrollController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createEnroll);
router.route('/getenroll/:id').get(protect, getEnroll);
router.route('/applied').post(protect, getApplied);


export default router;