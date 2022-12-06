const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const { googleAuth, googleRedirect } = require('./googleLogin')

module.exports = {
  register,
  login,
  googleAuth,
  googleRedirect,
  logout,
  ...require('./remindUserPassword'),
}
