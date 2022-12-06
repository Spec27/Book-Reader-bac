const hasConflict = ({ name, code }) =>
  name === 'MongoServerError' && code === 11000

const handleSchemaValidationErrors = (error, _, next) => {
  error.status = hasConflict(error) ? 409 : 400
  next()
}

module.exports = handleSchemaValidationErrors
