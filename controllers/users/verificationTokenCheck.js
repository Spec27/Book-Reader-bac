const { User } = require('../../models')
const { RequestError } = require('../../helpers')

const verificationTokenCheck = async (req, res) => {
  const { token: verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) throw RequestError(404, 'User not Found')

  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationToken: '',
  })

  const { FRONTEND_URL } = process.env

  res.redirect(`${FRONTEND_URL}/login`)
}

module.exports = { verificationTokenCheck }
