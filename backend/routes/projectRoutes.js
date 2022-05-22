import express from 'express'
import { createProject, getProject } from '../controllers/projectController.js';

const router = express.Router();

import { protect } from '../middleware/authMiddleware.js';

router.post('/createProject', protect, createProject);
router.get('/getProject', protect, getProject);


export default router;