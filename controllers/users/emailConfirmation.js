const { User } = require('../../models')
const {
  RequestError,
  sendEmailAddressConfirmationEmail,
} = require('../../helpers')

const emailConfirmation = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (user.verified)
    throw RequestError(400, 'Verification has already been passed')

  await sendEmailAddressConfirmationEmail(email, user.verificationToken)

  res.status(200).json({ message: 'Verification email was sent' })
}

module.exports = { emailConfirmation }
