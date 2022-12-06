const { User, Book } = require('../../models')

const userInfoFields = {
  token: 0,
  createdAt: 0,
  updatedAt: 0,
  password: 0,
  verificationToken: 0,
  isVerify: 0,
}

const userBooksFields = {
  reader: 0,
  createdAt: 0,
  updatedAt: 0,
}

const getCurrentUserInfo = async (req, res) => {
  const { _id: userId } = req.user

  const [currentUserInfo, currentUserBooks] = await Promise.all([
    User.findById(userId, userInfoFields),
    Book.find({ reader: userId }, userBooksFields),
  ])

  res.json({
    user: {
      info: currentUserInfo,
      books: currentUserBooks,
    },
  })
}

module.exports = { getCurrentUserInfo }
