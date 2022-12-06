const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

const createUser = async (body) => {
  const newUser = await User.create(body)
  
  const { id, email, userName, verificationToken } = newUser

  const token = jwt.sign({ id: newUser.id }, SECRET_KEY, {
    expiresIn: '20h',
  })
  newUser.token = token
  await newUser.save()

  return { id, email, userName, token, verificationToken }
}

module.exports = createUser
