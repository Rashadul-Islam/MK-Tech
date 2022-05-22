import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  changePassword
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.post('/changePassword/:id', protect, changePassword)


export default router;
