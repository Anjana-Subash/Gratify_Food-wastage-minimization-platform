import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    updateNgoUserProfile,
    getNgoUserProfile,
    getNgoUserData,
    getUserDonations,
} from '../controllers/ngoUserController.js'

import { ngoProtect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)

router
    .route('/profile')
    .get(ngoProtect, getNgoUserProfile)
    .put(ngoProtect, updateNgoUserProfile)
router.route('/donations').get(ngoProtect, getUserDonations)
router.route('/:id').get(getNgoUserData)
export default router
