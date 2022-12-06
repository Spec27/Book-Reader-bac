const express = require('express')
const controller = require('../../controllers/books')
const { updateResume, updateStatus } = require('../../controllers/books')
const {
  auth,
  authenticateUser,
  validateBody,
  validateRequestId,
  checkCorrectBookStatus,
} = require('../../middlewares')
const {
  schemas,
  updateResumeSchema,
  updateStatusSchema,
} = require('../../models')
const { ctrlWrapper } = require('../../helpers')

const router = express.Router()

router.post(
  '/add',
  auth,
  validateBody(schemas.addBooksSkhema),
  ctrlWrapper(controller.add)
)

router.patch(
  '/:id/resume',
  authenticateUser,
  validateRequestId,
  checkCorrectBookStatus,
  validateBody(updateResumeSchema),
  ctrlWrapper(updateResume)
)

router.patch(
  '/:id/status',
  authenticateUser,
  validateRequestId,
  validateBody(updateStatusSchema),
  ctrlWrapper(updateStatus)
)

module.exports = router
