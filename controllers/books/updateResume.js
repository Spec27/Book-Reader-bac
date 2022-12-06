const { Book } = require('../../models')

const updateResume = async (req, res) => {
  const { id } = req.params

  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    select: {
      rating: 1,
      summary: 1,
    },
  })

  res.json(updatedBook)
}

module.exports = { updateResume }
