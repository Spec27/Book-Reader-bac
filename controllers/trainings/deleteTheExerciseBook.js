const { Training } = require('../../models/training')
const { RequestError } = require('../../helpers')

const deleteBookTraining = async (req, res) => {
  const { trainingId } = req.params
  const result = await Training.findByIdAndRemove(trainingId)
  if (!result) {
    throw RequestError(404, 'Not Foun')
  }
  res.status(200).json({ message: 'book deleted' })
}

module.exports = deleteBookTraining
