import express from 'express'
import { createProject, getProject, memberRequest, progress, finish, complete } from '../controllers/projectController.js';

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

router.post('/createProject', protect, createProject);
router.get('/getProject', protect, getProject);
router.get('/memberRequest', protect, memberRequest);
router.post('/progress', protect, progress);
router.post('/finish', protect, finish);
router.post('/complete', protect, complete);


export default router;