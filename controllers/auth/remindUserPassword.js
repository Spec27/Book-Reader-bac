const { User } = require('../../models')
const { RequestError, sendForgottenPasswordEmail } = require('../../helpers')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt')

const remindUserPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) throw RequestError(404, `Cant find user with this email: ${email}`)

  const [newPassword] = randomUUID().split('-')
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  user.password = hashedPassword
  await user.save()

  user.password = await sendForgottenPasswordEmail(email, newPassword)

  res.status(200).json({ message: 'check your email' })
}

module.exports = { remindUserPassword }
