const { RequestError } = require('../../helpers')
const { Book } = require('../../models')

const updateStatus = async (req, res) => {
  const userId = req.user._id.toString()
  const { id: bookId } = req.params
  const { status: newStatus } = req.body

  const bookDetails = await Book.findById(bookId)

  if (!bookDetails) throw RequestError(404)

  if (bookDetails.reader.toString() !== userId) throw RequestError(403)

  bookDetails.status = newStatus
  const { status } = await bookDetails.save()

  res.json({ status })
}

module.exports = { updateStatus }
