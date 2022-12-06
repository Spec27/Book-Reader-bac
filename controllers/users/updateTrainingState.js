const { RequestError } = require('../../helpers')
const { User } = require('../../models')

const updateTrainingState = async (req, res) => {
  const { id: userId } = req.params
  const { _id: authenticatedUserId } = req.user
  const { isTraining } = req.body

  if (userId !== authenticatedUserId.toString()) throw RequestError(403)

  const trainingState = await User.findByIdAndUpdate(
    userId,
    { isTraining },
    {
      new: true,
      select: {
        isTraining: 1,
      },
    }
  )

  res.status(200).json(trainingState)
}

module.exports = { updateTrainingState }
