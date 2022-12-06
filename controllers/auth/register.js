const bcrypt = require('bcrypt')
const {
  RequestError,
  sendEmailAddressConfirmationEmail,
} = require('../../helpers')

const { User } = require('../../models/user')

const register = async (req, res, next) => {
  const { username, email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw RequestError(409, 'Email already registered')
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const result = await User.create({
    username,
    email,
    password: hashPassword,
    repeat_Password: hashPassword,
  })

  const { verificationToken } = result
  await sendEmailAddressConfirmationEmail(email, verificationToken)

  res.status(201).json({
    user: {
      username: result.username,
      email: result.email,
      _id: result._id,
    },
  })
}

module.exports = register
