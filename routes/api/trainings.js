const express = require('express')
const controller = require('../../controllers/trainings')
const { ctrlWrapper } = require('../../helpers')
const {
  getActiveTrainings,
  updateTrainigStatus,
  startTraining,
} = require('../../controllers/trainings')
const {
  authenticateUser,
  validateRequestId,
  validateBody,
} = require('../../middlewares')
const {
  updateTrainingStatusSchema,
  startTrainingSchema,
} = require('../../models')

const router = express.Router()

router.get('/', authenticateUser, ctrlWrapper(getActiveTrainings))

router.post(
  '/start',
  authenticateUser,
  validateBody(startTrainingSchema),
  ctrlWrapper(startTraining)
)

router.patch(
  '/:id/status',
  authenticateUser,
  validateRequestId,
  validateBody(updateTrainingStatusSchema),
  ctrlWrapper(updateTrainigStatus)
)

router.delete(
  '/:trainingId',
  authenticateUser,
  ctrlWrapper(controller.deleteBookTraining)
)
module.exports = router
