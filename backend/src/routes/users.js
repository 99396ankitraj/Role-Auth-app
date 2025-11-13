import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()

// Admin-only: list all users
router.get('/', auth, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    const users = await User.find({}, 'name email role createdAt').sort({ createdAt: -1 })
    return res.json({ users })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router
