const auth = require('./auth')
const validateBody = require('./validateBody')

module.exports = {
  validateBody,
  ...require('./authenticateUser'),
  ...require('./validateRequestId'),
  ...require('./checkCorrectBookStatus'),
  auth,
}
