import express from 'express'
import { addUsers, getAllUsers } from '../controllers/userController'

const router = express.Router();

router.get('/', getAllUsers)
router.post('/addUser', addUsers)

export default router;