const express = require('express')

const { ctrlWrapper } = require('../../helpers')
const {
  validateBody,
  authenticateUser,
  validateRequestId,
} = require('../../middlewares')
const {
  addResults,
  getCurrentUserInfo,
  resetUserProgress,
  updateTrainingState,
} = require('../../controllers/users')
const {
  addResultSchema,
  updateTrainingStateVerificationSchema,
} = require('../../models')

const router = express.Router()

router.get('/current', authenticateUser, ctrlWrapper(getCurrentUserInfo))

router.patch(
  '/:id/results',
  authenticateUser,
  validateRequestId,
  validateBody(addResultSchema),
  ctrlWrapper(addResults)
)

router.delete(
  '/:id/progress',
  authenticateUser,
  validateRequestId,
  ctrlWrapper(resetUserProgress)
)

router.patch(
  '/:id/training',
  authenticateUser,
  validateRequestId,
  validateBody(updateTrainingStateVerificationSchema),
  ctrlWrapper(updateTrainingState)
)

module.exports = router
