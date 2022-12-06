const { Book } = require('../../models/book')

const add = async (req, res) => {
  const { _id: reader } = req.user
  const result = await Book.create({ ...req.body, reader })
  res.status(201).json(result)
}

module.exports = add
