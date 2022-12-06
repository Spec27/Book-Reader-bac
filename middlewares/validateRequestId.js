const { isValidObjectId } = require('mongoose')
const { RequestError } = require('../helpers')

const validateRequestId = ({ params }, _, next) => {
  const { id } = params
  const hasCorrectId = isValidObjectId(id)

  !hasCorrectId && next(RequestError(400, `Incorrect ID format: ${id}`))

  next()
}

module.exports = { validateRequestId }
