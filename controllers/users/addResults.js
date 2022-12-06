const { RequestError } = require('../../helpers')
const { User } = require('../../models')

const addResults = async (req, res) => {
  const { id: userId } = req.params
  const { progress, _id: authenticatedUserId } = req.user

  if (userId !== authenticatedUserId.toString()) throw RequestError(403)

  progress.push(req.body)

  const updatedUserResults = await User.findByIdAndUpdate(
    userId,
    { progress },
    {
      new: true,
      select: {
        progress: 1,
      },
    }
  )

  res.json(updatedUserResults)
}

module.exports = { addResults }
