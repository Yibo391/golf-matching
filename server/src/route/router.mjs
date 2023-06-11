import express from 'express'
import controller from '../controller/controller.mjs'

const router = express.Router()
export default router

router.get('/api/queryMatches', controller.queryMatches)
router.get('/api/currentUser', controller.home)
router.get('/api/authInit', controller.googleAuthInit)
router.get('/api/authFinalize', controller.googleAuthFinalize)
router.get('/api/authSuccessful', controller.googleAuthSuccessful)
router.get('/api/editProfile', controller.editProfile)
router.get('/api/setLike', controller.setLike)
router.get('/api/populateChat', controller.populateChat)
