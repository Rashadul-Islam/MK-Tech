import express from 'express'
import { createEnroll, getEnroll, enrollDetails, getQuestion } from '../controllers/enrollController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(protect, createEnroll);
router.route('/getenroll/:id').get(protect, getEnroll);
router.route('/getquestion/:id').get(protect, getQuestion);
router.route('/enrollDetails/:id').get(protect, enrollDetails);


export default router;