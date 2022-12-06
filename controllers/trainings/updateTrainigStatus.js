const { RequestError } = require('../../helpers')
const { Training } = require('../../models')

const updateTrainigStatus = async (req, res) => {
  const { _id: userId } = req.user
  const { id: trainigId } = req.params
  const { status: newStatus } = req.body

  const training = await Training.findOne(
    {
      _id: trainigId,
      participator: userId,
    },
    { status: 1 }
  )

  if (!training) throw RequestError(404, 'Trainig not found')

  training.status = newStatus
  const { status } = await training.save()

  res.json({ status })
}

module.exports = { updateTrainigStatus }
