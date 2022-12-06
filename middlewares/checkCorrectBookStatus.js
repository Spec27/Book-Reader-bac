const { RequestError, bookStatus } = require('../helpers')
const { Book } = require('../models')

const checkCorrectBookStatus = async (req, _, next) => {
  const { id } = req.params
  const { _id } = req.user

  const book = await Book.findById(id, { reader: 1, status: 1 })

  if (!book) {
    next(RequestError(404, 'Book not found'))
    return
  }

  if (book.reader.toString() !== _id.toString()) {
    next(RequestError(404, 'Book not found'))
    return
  }

  if (book.status !== bookStatus.COMPLETED) {
    next(RequestError(400, 'Book status must be [completed]'))
    return
  }

  next()
}

module.exports = { checkCorrectBookStatus }
