const RequestError = require('./RequestError')
const handleSchemaValidationErrors = require('./handleSchemaValidationErrors')

const patterns = require('./patterns')
const ctrlWrapper = require('./ctrlWrapper')

module.exports = {
  handleSchemaValidationErrors,
  patterns,
  RequestError,
  ctrlWrapper,
  ...require('./const'),
  ...require('./sendEmail'),
  ...require('./sendEmailAddressConfirmationEmail'),
  ...require('./sendForgottenPasswordEmail'),
}
