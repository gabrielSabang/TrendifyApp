import express from 'express'
import { ifLoggedIn } from '../middleware/authMiddleware.js'
import {
  signUp,
  loginUser,
  logoutUser,
  getUser
} from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', ifLoggedIn, getUser)
router.post('/register', signUp)
router.post('/login', loginUser)
router.post('/logout', ifLoggedIn, logoutUser)

export default router