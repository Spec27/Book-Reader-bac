const { trainingStatus, RequestError } = require('../../helpers')
const { Training } = require('../../models')

const { ACTIVE } = trainingStatus

const trainigSelector = {
  createdAt: 0,
  updatedAt: 0,
  participator: 0,
}
const bookSelector = { createdAt: 0, updatedAt: 0, reader: 0 }

const getActiveTrainings = async (req, res) => {
  const { _id: userId } = req.user

  const activeTrainings = await Training.find(
    {
      participator: userId,
      status: ACTIVE,
    },
    trainigSelector
  ).populate('book', bookSelector)

  if (!activeTrainings) throw RequestError(404)

  res.json({ data: activeTrainings })
}

module.exports = { getActiveTrainings }
